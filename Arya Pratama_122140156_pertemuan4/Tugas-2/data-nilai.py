# List Mahasiswa
mahasiswa = [
    {"nama": "Ali", "nim": f"122140156", "uts": 95, "uas": 85, "tugas": 75},
    {"nama": "Bima", "nim": f"122140191", "uts": 65, "uas": 75, "tugas": 76},
    {"nama": "Cici", "nim": f"122140150", "uts": 65, "uas": 60, "tugas": 85},
    {"nama": "Dodi", "nim": f"122140190", "uts": 90, "uas": 87, "tugas": 90},
    {"nama": "Eni", "nim": f"122140155", "uts": 55, "uas": 50, "tugas": 65}
]

for mhs in mahasiswa:
    # Hitung nilai akhir
    mhs["nilai"] = round(0.3 * mhs["uts"] + 0.4 * mhs["uas"] + 0.3 * mhs["tugas"], 2)
    
    # Menentukan grade
    if mhs["nilai"] >= 80: mhs["grade"] = "A"
    elif mhs["nilai"] >= 70: mhs["grade"] = "B"
    elif mhs["nilai"] >= 60: mhs["grade"] = "C"
    elif mhs["nilai"] >= 50: mhs["grade"] = "D"
    else: mhs["grade"] = "E"

# Menampilkan tabel nilai akhir mahasiswa
print("=" * 60)
print("| No | Nama | NIM | Nilai | Grade |")
print("=" * 60)

nomor = 1
for mhs in mahasiswa:
    print(f"| {nomor} | {mhs['nama']} | {mhs['nim']} | {mhs['nilai']} | {mhs['grade']} |")
    nomor += 1

print("=" * 60)

# Menentukan dan menampilkan nilai tertinggi dan terendah
terbaik = max(mahasiswa, key=lambda x: x["nilai"])
terburuk = min(mahasiswa, key=lambda x: x["nilai"])
print(f"\nNilai tertinggi: {terbaik['nama']} ({terbaik['nilai']})")
print(f"Nilai terendah: {terburuk['nama']} ({terburuk['nilai']})")