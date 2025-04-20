import { createContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

export const BookContext = createContext();

export function BookProvider({ children }) {
    const [books, setBooks] = useLocalStorage("books", []);
    const [filter, setFilter] = useLocalStorage("filter", "all");
    const [search, setSearch] = useLocalStorage("search", "");

    const addBook = (book) => {
        const newBook = { ...book, id: crypto.randomUUID() };
        setBooks([...books, newBook]);
    };

    const removeBook = (id) => {
        setBooks(books.filter((b) => b.id !== id));
    };

    const editBook = (id, updated) => {
        setBooks(books.map((b) => (b.id === id ? { ...b, ...updated } : b)));
    };

    return (
        <BookContext.Provider
        value={{ books, addBook, removeBook, editBook, filter, setFilter, search, setSearch }}
        >
        {children}
        </BookContext.Provider>
    );
}