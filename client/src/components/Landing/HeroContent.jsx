import React from "react";
import { IoIosPlay } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {

    const navigate = useNavigate();

    const gotoLogin = () => {
        navigate("/login");
    }

    return (
        <div className="py-5 min-h-[70vh] flex flex-col items-center justify-center text-center flex-1 px-4 md:px-0">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                <IoIosPlay className="h-3 w-3 fill-primary text-[#24cfa6]" />
                <span>AI-Powered Learning</span>
            </div>
            <h1 className="text-[10vw] md:text-7xl font-mono text-white leading-snug max-w-5xl">
                Turn any {" "}<span className="text-[#24cfa6] italic">youtube</span> video
                into notes.
            </h1>

            <p className="text-white/70 mt-6 max-w-2xl text-sm md:text-lg">
                Paste a link → <span className="text-[#24cfa6] font-mono"> Get Summary, Notes, MCQs, Flashcards </span> instantly. <span className="hidden md:block"> Transform hours of video content into structured study materials in seconds.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-stretch justify-center mt-10 w-full max-w-2xl gap-3 px-4">

                <input
                    className="w-full sm:w-2/3 text-base rounded-md border border-gray-700 bg-zinc-900 px-4 py-4 text-zinc-300 focus:outline-none"
                    type="text"
                    placeholder="Paste Youtube URL here..."
                />

                <button
                onClick={gotoLogin}
                className="w-[70%] mx-auto sm:w-1/3 flex items-center justify-center gap-2 bg-[#24cfa6] hover:bg-[#1dab86] cursor-pointer text-black font-medium px-6 py-3 rounded-md transition">
                    <FiSend size={18} />
                    Generate Notes
                </button>

            </div>
        </div>
    );
};

export default HeroContent;
