import React from "react";
import { FaBook } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between py-8 px-3 md:px-12">
            <div className="flex flex-col items-center gap-2 text-white text-sm md:text-lg font-mono">
                <FaBook className="text-2xl sm:text-3xl text-[#24cfa6]" />
                <span>VidNote AI</span>
            </div>
            <div className="flex gap-2 md:gap-5 items-center">
                <NavLink
                    to="/login"
                    className="text-white cursor-pointer text-sm md:text-base px-4 py-2 rounded-md font-semibold transition"
                    activeClassName="font-bold text-gray-300"
                >
                    Sign In
                </NavLink>
                <NavLink
                    to="/register"
                    className="bg-[#24cfa6] text-sm md:text-base cursor-pointer text-black px-3 md:px-4 py-2 rounded-md font-mono transition"
                    activeClassName="bg-[#20b48b]"
                >
                    Get Started
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
