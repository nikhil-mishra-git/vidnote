import React, { useState } from "react";

const letters = ["A", "B", "C", "D"];

const MCQTab = ({ mcqs }) => (
    <div className="space-y-6">
        {Array.isArray(mcqs) && mcqs.length > 0 ? (
            mcqs.map((q, i) => <MCQCard key={i} mcq={q} index={i + 1} />)
        ) : (
            <p className="text-gray-400 text-center">No MCQs available</p>
        )}
    </div>
);

const MCQCard = ({ mcq, index }) => {
    const [selected, setSelected] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleSelect = (opt) => {
        if (selected === null) {
            setSelected(opt);
            setShowAnswer(true);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300">
            {/* Question */}
            <p className="text-gray-100 font-medium mb-4 text-lg">
                {index}. {mcq.question}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-3">
                {mcq.options.map((opt, i) => {
                    const isCorrect = opt === mcq.answer;
                    const isSelected = opt === selected;

                    let baseClasses =
                        "w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition border";
                    let bg = "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-gray-200";
                    let borderColor = "";
                    if (showAnswer) {
                        if (isCorrect) {
                            bg = "bg-green-600/30 text-green-300 border-green-500";
                        } else if (isSelected && !isCorrect) {
                            bg = "bg-red-600/30 text-red-300 border-red-500";
                        }
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => handleSelect(opt)}
                            disabled={showAnswer}
                            className={`${baseClasses} ${bg} ${borderColor}`}
                        >
                            <span className="font-bold w-6 h-6 flex items-center justify-center rounded-full bg-zinc-700 text-gray-300">
                                {letters[i]}
                            </span>
                            <span>{opt}</span>
                        </button>
                    );
                })}
            </div>

            {showAnswer && (
                <p className="mt-3 text-sm text-gray-400">
                    Correct Answer: <span className="text-green-400">{mcq.answer}</span>
                </p>
            )}
        </div>
    );
};

export default MCQTab;
