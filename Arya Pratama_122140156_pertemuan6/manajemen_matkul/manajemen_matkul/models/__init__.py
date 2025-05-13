from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy
import transaction  # Tambahkan import ini

# Import model classes untuk memastikan mereka ter-register oleh SQLAlchemy
from .mahasiswa import Mahasiswa  # Tambahkan import ini
from .matakuliah import Matakuliah  # Tambahkan model Matakuliah
from .mymodel import MyModel  # Ini sudah ada

# Run configure_mappers setelah mendefinisikan semua models
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Get a SqlAlchemy Session using zope.sqlalchemy.
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """
    Initialize the model for a Pyramid app.
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid.tm.ThreadLocalManager'

    # Use sqlite for development, configured in development.ini
    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    config.registry['dbsession_factory'] = session_factory

    # Add dbsession to request
    config.add_request_method(
        # Gunakan transaction.manager sebagai ganti r.tm
        lambda r: get_tm_session(session_factory, transaction.manager),
        'dbsession',
        reify=True
    )