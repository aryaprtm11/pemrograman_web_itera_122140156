import { useContext, useState } from "react";
import { BookContext } from "../../context/BookContext";

export default function BookList() {
  //Ambil data dari context global
  const { books, removeBook, editBook, filter, search } = useContext(BookContext);

  //Filter berdasarkan status dan pencarian
  const filteredBooks = books.filter((book) => {
    const matchFilter = filter === "all" || book.status === filter;
    const matchSearch = book.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  //Kelola edit
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", status: "milik" });

  //Fungsi untuk tombol edit
  const handleEdit = (book) => {
    setEditId(book.id);
    setEditForm({ title: book.title, author: book.author, status: book.status });
  };

  //Simpan nhasil edit
  const handleSave = () => {
    editBook(editId, editForm);
    setEditId(null);
  };

  //Fungsi perubahan yang sudah dilakukan
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Koleksi Buku</h2>

      {/* Tampilkan pesan jika tidak ada buku */}
      {filteredBooks.length === 0 ? (
        <p className="text-gray-400">Belum ada buku yang ditambahkan.</p>
      ) : (
        // Nampilin daftar buku
        <div className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory pb-2">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-gray-800 p-4 min-w-[220px] max-w-[240px] rounded-lg shadow hover:shadow-lg transition-transform duration-200 hover:scale-105 snap-start"
            >
              {/*Nampilin Gambar Buku */}
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}

              {/* Edit */}
              {editId === book.id ? (
                <>
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                    className="bg-gray-700 text-white w-full mb-2 px-2 py-1 rounded"
                  />
                  <input
                    name="author"
                    value={editForm.author}
                    onChange={handleChange}
                    className="bg-gray-700 text-white w-full mb-2 px-2 py-1 rounded"
                  />
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleChange}
                    className="bg-gray-700 text-white w-full mb-2 px-2 py-1 rounded"
                  >
                    <option value="milik">Milik</option>
                    <option value="baca">Baca</option>
                    <option value="beli">Beli</option>
                  </select>
                  <button
                    onClick={handleSave}
                    className="w-full bg-green-600 hover:bg-green-700 py-1 mt-1 rounded text-white"
                  >
                    Simpan
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold truncate">{book.title}</h3>
                    <span className="text-xs bg-[#e50914] px-2 py-0.5 rounded-full text-white whitespace-nowrap">
                      {book.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">oleh {book.author}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 text-sm rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeBook(book.id)}
                      className="bg-[#e50914] hover:bg-red-700 px-3 py-1 text-sm rounded text-white"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}