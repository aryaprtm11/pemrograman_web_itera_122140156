from buku import Buku
from majalah import Majalah

def tampilkan_tabel_item(perpustakaan):
    item_koleksi = perpustakaan.koleksi_item
    
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