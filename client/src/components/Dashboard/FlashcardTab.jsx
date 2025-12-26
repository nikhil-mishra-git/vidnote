import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Flashcards = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrentIndex((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
  };

  if (!flashcards || flashcards.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No flashcards available
      </p>
    );
  }

  const card = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto mt-10">
      {/* Flashcard */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full h-66 perspective cursor-pointer"
      >
        <div
          className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute w-full h-full bg-zinc-900 border border-zinc-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center backface-hidden">
            <p className="text-gray-400 text-md mb-3 uppercase tracking-wide">
              Question
            </p>
            <h2 className="text-lg md:text-xl font-medium text-white leading-snug">
              {card.question}
            </h2>
            <p className="mt-4 text-gray-500 text-sm">Click to reveal answer</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-zinc-900 border border-zinc-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180">
            <p className="text-gray-400 text-md mb-3 uppercase tracking-wide">
              Answer
            </p>
            <h2 className="text-lg md:text-xl font-medium text-green-400 leading-snug">
              {card.answer}
            </h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={prevCard}
          className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
        >
          <FiChevronLeft className="text-white" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {flashcards.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition ${
                i === currentIndex ? "bg-blue-500" : "bg-zinc-700"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
        >
          <FiChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
