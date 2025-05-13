import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError, IntegrityError
import transaction

from .. import models


def setup_models(dbsession):
    """
    Add initial model objects.
    """
    # Cek apakah data mahasiswa sudah ada
    existing_mahasiswa = dbsession.query(models.Mahasiswa).first()
    if existing_mahasiswa is None:
        # Tambahkan data awal untuk Mahasiswa
        mahasiswa1 = models.Mahasiswa(
            nim='12345',
            nama='Budi Santoso',
            jurusan='Teknik Informatika',
            tanggal_lahir=date(2000, 5, 15),
            alamat='Jl. Merdeka No. 123, Bandung'
        )
        mahasiswa2 = models.Mahasiswa(
            nim='54321',
            nama='Siti Aminah',
            jurusan='Sistem Informasi',
            tanggal_lahir=date(2001, 8, 22),
            alamat='Jl. Mawar No. 45, Jakarta'
        )
        dbsession.add(mahasiswa1)
        dbsession.add(mahasiswa2)
    
    # Cek apakah data matakuliah sudah ada
    existing_matakuliah = dbsession.query(models.Matakuliah).first()
    if existing_matakuliah is None:
        # Tambahkan data awal untuk Matakuliah
        matakuliah1 = models.Matakuliah(
            kode_mk='IF101',
            nama_mk='Pemrograman Dasar',
            sks=3,
            semester=1
        )
        matakuliah2 = models.Matakuliah(
            kode_mk='IF201',
            nama_mk='Algoritma dan Struktur Data',
            sks=4,
            semester=2
        )
        matakuliah3 = models.Matakuliah(
            kode_mk='IF301',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=3
        )
        dbsession.add(matakuliah1)
        dbsession.add(matakuliah2)
        dbsession.add(matakuliah3)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with transaction.manager:
            # Get the session factory from the registry
            session_factory = env['registry']['dbsession_factory']
            # Create a session with transaction manager
            dbsession = models.get_tm_session(session_factory, transaction.manager)
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.

Your database should be up and running before you
initialize your project. Make sure your database server
is running and your connection string in development.ini
is correctly configured.
''')
    except IntegrityError:
        print("Data sudah ada di database. Proses initialize_db tetap berjalan.")


if __name__ == '__main__':
    main()