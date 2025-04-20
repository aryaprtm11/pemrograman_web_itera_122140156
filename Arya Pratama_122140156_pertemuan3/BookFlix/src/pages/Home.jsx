import { useState } from "react";
import BookList from "../components/BookList/BookList";
import BookFilter from "../components/BookFilter/BookFilter";
import BookForm from "../components/BookForm/BookForm";

export default function Home() {
    const [showForm, setShowForm] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleOpen = () => {
        setIsClosing(false);
        setShowForm(true);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
        setShowForm(false);
        setIsClosing(false);
        }, 250); // ⏱ sesuai durasi animasi fadeOut
    };

    return (
        <div className="min-h-screen bg-[#141414] text-white p-8 max-w-6xl mx-auto relative">

            <BookFilter onAddClick={handleOpen} />
            <BookList />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className={`bg-[#1f1f1f] p-6 rounded-lg shadow-xl w-full max-w-md relative transform scale-95 opacity-0 ${
                        isClosing ? "fade-out" : "fade-in"
                        }`}
                    >
                        <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-white text-xl font-bold hover:text-red-400"
                        >
                        &times;
                        </button>
                        <BookForm afterSubmit={handleClose} />
                    </div>
                </div>
            )}
        </div>
    );
}