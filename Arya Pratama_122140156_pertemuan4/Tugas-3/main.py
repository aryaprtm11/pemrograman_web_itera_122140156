import math_operation

print("=" * 50)
print("PERHITUNGANN MATEMATIKA SEDERHANA")
print("=" * 50)

print("\nPilih kategori operasi:")
print("1. Perhitungan Geometri")
print("2. Konversi Suhu")
print("3. Keluar")

pilihan_kategori = input("\nMasukkan pilihan (1/2/3): ")

if pilihan_kategori == "1":
    print("\n--- PERHITUNGAN GEOMETRI ---")
    print("Pilih bentuk:")
    print("1. Persegi")
    print("2. Persegi Panjang")
    print("3. Lingkaran")
    
    pilihan_bentuk = input("\nMasukkan pilihan bentuk (1/2/3): ")
    
    if pilihan_bentuk == "1":
        sisi = float(input("\nMasukkan panjang sisi persegi: "))
        print("\nHasil perhitungan:")
        print(f"Luas persegi: {math_operation.luas_persegi(sisi):.2f}")
        print(f"Keliling persegi: {math_operation.keliling_persegi(sisi):.2f}")
    elif pilihan_bentuk == "2":
        panjang = float(input("\nMasukkan panjang persegi panjang: "))
        lebar = float(input("Masukkan lebar persegi panjang: "))
        print("\nHasil perhitungan:")
        print(f"Luas persegi panjang: {math_operation.luas_persegi_panjang(panjang, lebar):.2f}")
        print(f"Keliling persegi panjang: {math_operation.keliling_persegi_panjang(panjang, lebar):.2f}")
    elif pilihan_bentuk == "3":
        jari_jari = float(input("\nMasukkan jari-jari lingkaran: "))
        print("\nHasil perhitungan:")
        print(f"Luas lingkaran: {math_operation.luas_lingkaran(jari_jari):.2f}")
        print(f"Keliling lingkaran: {math_operation.keliling_lingkaran(jari_jari):.2f}")
elif pilihan_kategori == "2":
    print("\n--- KONVERSI SUHU ---")
    print("Pilih konversi:")
    print("1. Celsius ke Fahrenheit")
    print("2. Celsius ke Kelvin")
    print("3. Fahrenheit ke Celsius")
    print("4. Kelvin ke Celsius")
    
    pilihan_konversi = input("\nMasukkan pilihan konversi (1/2/3/4): ")
    
    if pilihan_konversi == "1":
        suhu = float(input("\nMasukkan suhu dalam Celsius: "))
        hasil = math_operation.celsius_ke_fahrenheit(suhu)
        print(f"\n{suhu}°C = {hasil:.2f}°F")
    elif pilihan_konversi == "2":
        suhu = float(input("\nMasukkan suhu dalam Celsius: "))
        hasil = math_operation.celsius_ke_kelvin(suhu)
        print(f"\n{suhu}°C = {hasil:.2f}K")
    elif pilihan_konversi == "3":
        suhu = float(input("\nMasukkan suhu dalam Fahrenheit: "))
        hasil = math_operation.fahrenheit_ke_celsius(suhu)
        print(f"\n{suhu}°F = {hasil:.2f}°C")
    elif pilihan_konversi == "4":
        suhu = float(input("\nMasukkan suhu dalam Kelvin: "))
        hasil = math_operation.kelvin_ke_celsius(suhu)
        print(f"\n{suhu}K = {hasil:.2f}°C")
elif pilihan_kategori == "3":
    print("\nANDA KELUAR PROGRAM")