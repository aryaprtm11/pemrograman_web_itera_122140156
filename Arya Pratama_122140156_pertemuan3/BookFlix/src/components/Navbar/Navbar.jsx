import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-[#141414] py-6 px-6 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-4xl md:text-5xl font-netflix text-[#e50914] uppercase tracking-widest leading-none">BookFlix</h1>
                <div className="flex gap-6 text-2xl md:text-base">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                        isActive
                            ? "text-white border-b-2 border-[#e50914] pb-1"
                            : "text-gray-300 hover:text-white transition"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/stats"
                        className={({ isActive }) =>
                        isActive
                            ? "text-white border-b-2 border-[#e50914] pb-1"
                            : "text-gray-300 hover:text-white transition"
                        }
                    >
                        Statistik
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}