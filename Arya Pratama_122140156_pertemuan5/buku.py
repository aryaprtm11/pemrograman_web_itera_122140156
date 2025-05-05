from item_perpustakaan import ItemPerpustakaan

class Buku(ItemPerpustakaan):
    def __init__(self, kode, judul, tahun_terbit, penulis, jml_halaman):
        super().__init__(kode, judul, tahun_terbit)
        self._penulis = penulis
        self._jml_halaman = jml_halaman

    @property
    def penulis(self): 
        return self._penulis

    def tampilkan_info(self):
        status = "Tersedia" if self.status_tersedia else "Dipinjam"
        return f"BUKU [Kode: {self.kode}] - {self._judul} ({self._tahun_terbit}) oleh {self._penulis}, {self._jml_halaman} halaman. Status: {status}"