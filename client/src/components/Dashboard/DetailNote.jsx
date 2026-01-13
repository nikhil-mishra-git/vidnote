import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, deleteNote } from "../../api/apiCalls.js";
import toast from "react-hot-toast";
import ConfirmDelete from "../utils/ConfirmDelete.jsx";

import SummaryTab from "./SummaryTab.jsx";
import NotesTab from "./NotesTab.jsx";
import MCQTab from "./MCQTab.jsx";
import FlashcardTab from "./FlashcardTab.jsx";

import {
  FiMoreVertical,
  FiTrash2,
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiExternalLink,
} from "react-icons/fi";
import { PiUserCircleCheckBold } from "react-icons/pi";

const DetailNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);


  const tabs = ["summary", "notes", "mcqs", "flashcards"];

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await getNoteById(id);
        if (res.success) setNote(res.note);
        else setError("Failed to fetch note");
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading)
    return (
      <p className="text-gray-300 text-center mt-30">Loading...</p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">{error}</p>
    );
  if (!note) return null;

  const handleDelete = async () => {
    try {
      const res = await deleteNote(id);
      if (res?.success) {
        toast.success(res?.message);
        navigate("/dashboard/my-notes");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete note");
    }
  };


  return (
    <div className="min-h-screen md:px-4 font-mono text-white">

      <div className="flex justify-between items-center gap-2 my-4 flex-wrap">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition"
        >
          <FiArrowLeft /> Back
        </button>

        {/* THREE DOT MENU */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full cursor-pointer hover:bg-white/10 transition"
          >
            <FiMoreVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-white/10 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setConfirmOpen(true);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition"
              >
                <FiTrash2 /> Delete
              </button>

            </div>
          )}
        </div>
      </div>

      {/* VIDEO HEADER */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[45%] relative rounded-xl overflow-hidden border border-white/10">
          <img
            src={note.thumbnail}
            alt={note.title}
            className="w-full h-56 sm:h-72 md:h-80 object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            {note.duration}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <span className="bg-[#24cfa6]/20 text-[#24cfa6] px-3 py-1 rounded-full text-xs w-fit mb-3">
            Processed
          </span>

          <h1 className="text-2xl md:text-3xl tracking-wide font-semibold leading-snug">
            {note.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-400 text-sm mt-4">
            <div className="flex items-center gap-2">
              <FiCalendar />
              {new Date(note.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <PiUserCircleCheckBold size={20} /> {note.author}
            </div>
          </div>

          {note.youtubeUrl && (
            <a
              href={note.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-lg w-fit"
            >
              <FiExternalLink /> Watch on YouTube
            </a>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-1 flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 w-full text-sm rounded-lg transition tracking-wide whitespace-nowrap ${activeTab === tab
              ? "bg-black text-white"
              : "text-gray-400 hover:text-white"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-8 space-y-6">
        {activeTab === "summary" && (
          <SummaryTab summary={note.summary} />
        )}
        {activeTab === "notes" && (
          <NotesTab notes={note.notes} />
        )}
        {activeTab === "mcqs" && (
          <MCQTab mcqs={note.mcqs} />
        )}
        {activeTab === "flashcards" && (
          <FlashcardTab flashcards={note.flashcards} />
        )}
      </div>

      <ConfirmDelete
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          handleDelete();
        }}
      />

    </div>
  );
};

export default DetailNote;
