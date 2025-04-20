import { useState, useContext } from "react";
import { BookContext } from "../../context/BookContext";
import PropTypes from "prop-types";

export default function BookForm({ afterSubmit }) {
  //Context digunakan secara global untuk tambah buku
  const { addBook } = useContext(BookContext);

  //Form input
  const [form, setForm] = useState({ title: "", author: "", status: "milik" });
  
  //Buat simpan Base64 image
  const [image, setImage] = useState("");

  //Pesan ketika error saat input form
  const [error, setError] = useState("");

  //Untuk perubahan input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //Upload gambar yang dikonversi ke Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64
    };
    reader.readAsDataURL(file);
  };

  //Untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError("Judul dan Penulis wajib diisi!");
      return;
    }

    const newBook = {
      ...form,
      image, // Nambahin image base64
    };

    addBook(newBook);
    setForm({ title: "", author: "", status: "milik" });
    setImage("");
    setError("");
    if (afterSubmit) afterSubmit(); // Tutup popup
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-white mb-4">Tambah Buku</h2>

      <div className="mb-3">
        <label className="block text-sm mb-1 text-white">Judul:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1 text-white">Penulis:</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1 text-white">Status:</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        >
          <option value="milik">Milik</option>
          <option value="baca">Sudah Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1 text-white">Gambar Buku:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Nampilin error */}
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      <button
        type="submit"
        className="w-full bg-[#e50914] py-2 px-4 rounded font-bold text-white hover:bg-red-700 transition"
      >
        Tambah Buku
      </button>
    </form>
  );
}

BookForm.propTypes = {
  afterSubmit: PropTypes.func,
};