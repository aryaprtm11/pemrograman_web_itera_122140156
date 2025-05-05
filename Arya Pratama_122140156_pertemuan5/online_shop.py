from abc import ABC, abstractmethod

class ItemPerpustakaan(ABC):
    def __init__(self, kode, judul, tahun_terbit):
        self._kode = kode
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self._status_tersedia = True
        
    @property
    def kode(self): return self._kode
    @property
    def judul(self): return self._judul
    @property
    def status_tersedia(self): return self._status_tersedia
        
    def pinjam(self):
        if self._status_tersedia:
            self._status_tersedia = False
            return True
        return False
        
    def kembalikan(self):
        self._status_tersedia = True
        
    @abstractmethod
    def tampilkan_info(self): pass

class Buku(ItemPerpustakaan):
    def __init__(self, kode, judul, tahun_terbit, penulis, jml_halaman):
        super().__init__(kode, judul, tahun_terbit)
        self._penulis = penulis
        self._jml_halaman = jml_halaman
        
    @property
    def penulis(self): return self._penulis
        
    def tampilkan_info(self):
        status = "Tersedia" if self.status_tersedia else "Dipinjam"
        return f"BUKU [Kode: {self.kode}] - {self._judul} ({self._tahun_terbit}) oleh {self._penulis}, {self._jml_halaman} halaman. Status: {status}"
        
class Majalah(ItemPerpustakaan):
    def __init__(self, kode, judul, tahun_terbit, edisi, penerbit):
        super().__init__(kode, judul, tahun_terbit)
        self._edisi = edisi
        self._penerbit = penerbit
        
    @property
    def edisi(self): return self._edisi
        
    def tampilkan_info(self):
        status = "Tersedia" if self.status_tersedia else "Dipinjam"
        return f"MAJALAH [Kode: {self.kode}] - {self._judul} ({self._tahun_terbit}), Edisi {self._edisi}, Penerbit: {self._penerbit}. Status: {status}"

class Perpustakaan:
    def __init__(self, nama):
        self.__nama = nama
        self.__koleksi_item = []
        
    @property
    def nama(self): return self.__nama
    @property
    def total_item(self): return len(self.__koleksi_item)
    
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

def tampilkan_tabel_item(perpustakaan):
    item_koleksi = perpustakaan._Perpustakaan__koleksi_item
    if not item_koleksi:
        return "Perpustakaan kosong."
    
    header_tabel = ["ID", "Judul", "Tahun Terbit", "Jenis", "Detail", "Status"]
    
    baris_data = []
    for item in item_koleksi:
        if isinstance(item, Buku):
            jenis, detail = "Buku", f"Penulis: {item.penulis}, Halaman: {item._jml_halaman}"
        elif isinstance(item, Majalah):
            jenis, detail = "Majalah", f"Edisi: {item.edisi}, Penerbit: {item._penerbit}"
        else:
            jenis, detail = "Tidak Diketahui", "-"
        status = "Tersedia" if item.status_tersedia else "Dipinjam"
        baris_data.append([item.kode, item.judul, str(item._tahun_terbit), jenis, detail, status])
    
    lebar_kolom = [len(h) for h in header_tabel]
    for baris in baris_data:
        for idx, sel in enumerate(baris):
            lebar_kolom[idx] = max(lebar_kolom[idx], len(sel))
    
    garis_pembatas = "+" + "+".join(["-" * (w + 2) for w in lebar_kolom]) + "+"
    buat_baris = lambda sel_data: "| " + " | ".join(sel.ljust(lebar_kolom[idx]) for idx, sel in enumerate(sel_data)) + " |"
    
    output_tabel = [garis_pembatas, buat_baris(header_tabel), garis_pembatas]
    for baris in baris_data:
        output_tabel.append(buat_baris(baris))
    output_tabel.append(garis_pembatas)
    
    return "\n".join(output_tabel)

def program_utama():
    perpus = Perpustakaan("Perpustakaan Sederhana")
    
    while True:
        print("\n" + "="*50)
        print(f"SISTEM MANAJEMEN {perpus.nama.upper()}")
        print("="*50)
        print("1. Tambah Item")
        print("2. Tampilkan Semua Item")
        print("3. Cari Item berdasarkan ID")
        print("4. Cari Item berdasarkan Judul")
        
        pilihan = input("\nPilih menu (1-4): ")
        
        if pilihan == "1":
            jenis_item = input("Jenis item (1: Buku, 2: Majalah): ")
            kode = input("ID: ")
            judul = input("Judul: ")
            tahun = int(input("Tahun Terbit: "))
            
            if jenis_item == "1":
                penulis = input("Penulis: ")
                halaman = int(input("Jumlah Halaman: "))
                perpus.tambah_item(Buku(kode, judul, tahun, penulis, halaman))
                print("Buku berhasil ditambahkan!")
            elif jenis_item == "2":
                edisi = input("Edisi: ")
                penerbit = input("Penerbit: ")
                perpus.tambah_item(Majalah(kode, judul, tahun, edisi, penerbit))
                print("Majalah berhasil ditambahkan!")
            else:
                print("Jenis item tidak valid!")
                
        elif pilihan == "2":
            print(tampilkan_tabel_item(perpus))
            
        elif pilihan == "3":
            kode = input("Masukkan ID item: ")
            item = perpus.cari_item_dengan_kode(kode)
            print(item.tampilkan_info() if item else f"Item dengan ID {kode} tidak ditemukan.")
                
        elif pilihan == "4":
            judul = input("Masukkan judul item: ")
            items = perpus.cari_item_dengan_judul(judul)
            if items:
                print(f"Ditemukan {len(items)} item:")
                for i, item in enumerate(items, 1):
                    print(f"{i}. {item.tampilkan_info()}")
            else:
                print(f"Tidak ada item dengan judul yang mengandung '{judul}'.")
                
        else:
            print("Pilihan tidak valid. Silakan coba lagi.")

if __name__ == "__main__":
    program_utama()