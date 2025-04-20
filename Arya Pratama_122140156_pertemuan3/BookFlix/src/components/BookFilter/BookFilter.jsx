import { useContext } from "react";
import { BookContext } from "../../context/BookContext";

export default function BookFilter({ onAddClick }) {
    const { filter, setFilter, search, setSearch } = useContext(BookContext);

    const statusOptions = ["all", "milik", "baca", "beli"];

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            {/* Filter Status */}
            <div className="flex gap-2 flex-wrap">
                {statusOptions.map((s) => (
                <button
                    key={s}
                    onClick={() => setFilter(s)} //Ketika di klik akan memperbarui filter di context
                    className={`px-4 py-2 rounded-full font-medium text-sm ${
                    filter === s
                        ? "bg-[#e50914] text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    } transition duration-150`}
                >
                    {s === "all" ? "Semua" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
                ))}
            </div>

            {/* Search + Tambah Buku */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full sm:w-auto">
                <input
                type="text"
                placeholder="Cari judul buku..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} //Untuk update keyword pencarian
                className="flex-1 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
                />
                <button
                onClick={onAddClick} //Untuk membukka Popup
                className="bg-[#e50914] hover:bg-[#f6121d] text-white font-bold px-4 py-2 rounded"
                >
                + Tambah Buku
                </button>
            </div>
        </div>
    );
}