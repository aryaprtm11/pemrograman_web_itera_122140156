from item_perpustakaan import ItemPerpustakaan

class Perpustakaan:
    def __init__(self, nama):
        self.__nama = nama
        self.__koleksi_item = []

    @property
    def nama(self): 
        return self.__nama

    @property
    def total_item(self): 
        return len(self.__koleksi_item)
    
    @property
    def koleksi_item(self):
        return self.__koleksi_item

    def tambah_item(self, item):
        if isinstance(item, ItemPerpustakaan):
            self.__koleksi_item.append(item)
            return True
        return False

    def tampilkan_semua_item(self):
        if not self.__koleksi_item:
            return "Perpustakaan kosong."
        
        hasil = f"Daftar Item di Perpustakaan {self.__nama} ({self.total_item} item):\n"
        for i, item in enumerate(self.__koleksi_item, 1):
            hasil += f"{i}. {item.tampilkan_info()}\n"
        
        return hasil

    def cari_item_dengan_kode(self, kode):
        for item in self.__koleksi_item:
            if item.kode == kode:
                return item
        return None

    def cari_item_dengan_judul(self, judul):
        return [item for item in self.__koleksi_item if judul.lower() in item.judul.lower()]