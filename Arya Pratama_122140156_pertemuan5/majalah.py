from item_perpustakaan import ItemPerpustakaan

class Majalah(ItemPerpustakaan):
    def __init__(self, kode, judul, tahun_terbit, edisi, penerbit):
        super().__init__(kode, judul, tahun_terbit)
        self._edisi = edisi
        self._penerbit = penerbit

    @property
    def edisi(self): 
        return self._edisi

    def tampilkan_info(self):
        status = "Tersedia" if self.status_tersedia else "Dipinjam"
        return f"MAJALAH [Kode: {self.kode}] - {self._judul} ({self._tahun_terbit}), Edisi {self._edisi}, Penerbit: {self._penerbit}. Status: {status}"