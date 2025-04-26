# Konstanta
PI = 3.14159

# Peregi
def luas_persegi(sisi):
    return sisi * sisi

def keliling_persegi(sisi): 
    return 4 * sisi

# Persegi panjang
def luas_persegi_panjang(panjang, lebar): 
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar): 
    return 2 * (panjang + lebar)

# lingkaran
def luas_lingkaran(jari_jari): 
    return PI * jari_jari * jari_jari

def keliling_lingkaran(jari_jari): 
    return 2 * PI * jari_jari

# Konversi suhu
def celsius_ke_fahrenheit(celsius): 
    return (celsius * 9/5) + 32

def celsius_ke_kelvin(celsius): 
    return celsius + 273.15

def fahrenheit_ke_celsius(fahrenheit): 
    return (fahrenheit - 32) * 5/9

def kelvin_ke_celsius(kelvin): 
    return kelvin - 273.15