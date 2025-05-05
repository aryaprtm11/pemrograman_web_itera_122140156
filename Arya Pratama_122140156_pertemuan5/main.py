from perpustakaan import Perpustakaan
from buku import Buku
from majalah import Majalah
from tampilan import tampilkan_tabel_item

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
        print("5. Keluar")
        
        pilihan = input("\nPilih menu (1-5): ")
        
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
                
        elif pilihan == "5":
            print("Terima kasih telah menggunakan Sistem Manajemen Perpustakaan!")
            break
            
        else:
            print("Pilihan tidak valid. Silakan coba lagi.")

if __name__ == "__main__":
    program_utama()