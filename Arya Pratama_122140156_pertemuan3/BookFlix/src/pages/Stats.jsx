import { useContext } from "react";
import { BookContext } from "../context/BookContext";

export default function Stats() {
    const { books } = useContext(BookContext);

    const total = books.length;
    const milik = books.filter((b) => b.status === "milik").length;
    const baca = books.filter((b) => b.status === "baca").length;
    const beli = books.filter((b) => b.status === "beli").length;

    const statCard = (label, count, color) => (
        <div className={`bg-${color}-800 p-6 rounded-lg text-center shadow`}>
        <h3 className="text-xl font-semibold mb-2">{label}</h3>
        <p className="text-4xl font-bold text-white">{count}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#141414] text-white p-8 max-w-5xl mx-auto">
            <h1 className="text-4xl font-netflix text-[#e50914] mb-8 uppercase tracking-widest">
                Statistik Buku
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {statCard("Total Buku", total, "gray")}
                {statCard("Milik", milik, "green")}
                {statCard("Dibaca", baca, "blue")}
                {statCard("Ingin Dibeli", beli, "red")}
            </div>
        </div>
    );
}