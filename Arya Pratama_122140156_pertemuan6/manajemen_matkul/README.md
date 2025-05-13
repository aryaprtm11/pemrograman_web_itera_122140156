# Aplikasi Manajemen Matakuliah dengan Pyramid

Aplikasi API sederhana untuk manajemen matakuliah menggunakan framework Pyramid.

## Prasyarat

- Python 3.6+
- PostgreSQL
- Pyramid framework
- SQLAlchemy

## Instalasi

1. Clone repository
2. Buat virtual environment Python:
   ```
   python -m venv venv
   ```
3. Aktifkan virtual environment:
   ```
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```
4. Install dependencies:
   ```
   pip install -e .
   ```
5. Siapkan PostgreSQL database dengan nama `manajemen_matkul`
6. Berikan hak akses pada user PostgreSQL:
   ```
   psql -U postgres -c "ALTER USER pyramid_user WITH SUPERUSER;"
   ```
7. Jalankan migrasi dan inisialisasi data:
   ```
   alembic -c development.ini upgrade head
   python -m manajemen_matkul.scripts.initialize_db development.ini
   ```
8. Jalankan server:
   ```
   pserve development.ini
   ```

## API Endpoints

### Matakuliah API

#### GET /api/matakuliah
Mendapatkan daftar semua matakuliah

Response:
```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Pemrograman Dasar",
      "sks": 3,
      "semester": 1
    },
    ...
  ]
}
```

#### GET /api/matakuliah/{id}
Mendapatkan detail satu matakuliah berdasarkan ID

Response:
```json
{
  "matakuliah": {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Pemrograman Dasar",
    "sks": 3,
    "semester": 1
  }
}
```

#### POST /api/matakuliah
Menambahkan matakuliah baru

Request Body:
```json
{
  "kode_mk": "IF401",
  "nama_mk": "Kecerdasan Buatan",
  "sks": 3,
  "semester": 4
}
```

Response:
```json
{
  "success": true,
  "matakuliah": {
    "id": 4,
    "kode_mk": "IF401",
    "nama_mk": "Kecerdasan Buatan",
    "sks": 3,
    "semester": 4
  }
}
```

#### PUT /api/matakuliah/{id}
Mengupdate data matakuliah yang sudah ada

Request Body:
```json
{
  "nama_mk": "Kecerdasan Buatan Lanjut",
  "sks": 4
}
```

Response:
```json
{
  "success": true,
  "matakuliah": {
    "id": 4,
    "kode_mk": "IF401",
    "nama_mk": "Kecerdasan Buatan Lanjut",
    "sks": 4,
    "semester": 4
  }
}
```

#### DELETE /api/matakuliah/{id}
Menghapus data matakuliah

Response:
```json
{
  "success": true,
  "message": "Matakuliah dengan id 4 berhasil dihapus"
}
```

### Mahasiswa API

#### GET /api/mahasiswa
Mendapatkan daftar semua mahasiswa

#### GET /api/mahasiswa/{id}
Mendapatkan detail satu mahasiswa berdasarkan ID

#### POST /api/mahasiswa
Menambahkan mahasiswa baru

#### PUT /api/mahasiswa/{id}
Mengupdate data mahasiswa yang sudah ada

#### DELETE /api/mahasiswa/{id}
Menghapus data mahasiswa

## Menguji API

API dapat diuji menggunakan curl atau Postman.

Contoh menggunakan curl:

```bash
# Mendapatkan semua matakuliah
curl http://localhost:6543/api/matakuliah

# Menambahkan matakuliah baru
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk":"IF401","nama_mk":"Kecerdasan Buatan","sks":3,"semester":4}'

# Mengupdate matakuliah
curl -X PUT http://localhost:6543/api/matakuliah/4 \
  -H "Content-Type: application/json" \
  -d '{"nama_mk":"Kecerdasan Buatan Lanjut","sks":4}'

# Menghapus matakuliah
curl -X DELETE http://localhost:6543/api/matakuliah/4
``` 