def hitung_bmi():
    # Input User
    berat_badan = float(input("> Input massa tubuh Anda (kg): "))
    tinggi_badan = float(input("> Input tinggi Anda (cm): "))
    
    # Perhitungan BMI
    bmi = berat_badan / (tinggi_badan/100)**2
    
    if bmi < 18.5:
        status = "Kekurangan berat badan"
    elif bmi >= 18.5 and bmi < 25:
        status = "Berat badan ideal"
    elif bmi >= 25 and bmi < 30:
        status = "Kelebihan berat badan"
    else:
        status = "Obesitas"
    
    # Menampilkan hasil perhitungan
    print("\n===============Laporan Body Mass Index (BMI)===============")
    print("-" * 30)
    print(f"> Nilai BMI : {bmi:.2f}")
    print(f"> Status : {status}")
    print("-" * 30)

# Menjalankan program
if __name__ == "__main__":
    print("Body Mass Index Calculator")
    hitung_bmi()