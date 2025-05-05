from abc import ABC, abstractmethod

class ItemPerpustakaan(ABC):
    def __init__(self, kode, judul, tahun_terbit):
        self._kode = kode
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self._status_tersedia = True

    @property
    def kode(self): 
        return self._kode

    @property
    def judul(self): 
        return self._judul

    @property
    def status_tersedia(self): 
        return self._status_tersedia

    def pinjam(self):
        if self._status_tersedia:
            self._status_tersedia = False
            return True
        return False

    def kembalikan(self):
        self._status_tersedia = True

    @abstractmethod
    def tampilkan_info(self): 
        pass