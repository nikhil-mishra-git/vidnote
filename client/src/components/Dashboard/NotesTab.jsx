import { FiEdit3 } from "react-icons/fi";

const NotesTab = ({ notes }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 shadow-lg transition-all hover:shadow-2xl space-y-10">

        {/* Header */}
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <FiEdit3 className="text-blue-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-white">Notes</h3>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {notes ? (
                notes.split("\n").map((n, i) => (
                    <div
                        key={i}
                        className="relative bg-white/5 border border-white/10 p-5 rounded-2xl 
                       shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                        <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full 
                             bg-zinc-900 border border-white/10 
                             flex items-center justify-center text-xs text-blue-400 font-semibold">
                            {i + 1}
                        </span>

                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                            {n.replace(/^- /, "")}
                        </p>

                    </div>
                ))
            ) : (
                <p className="text-gray-400 col-span-full">
                    No notes available
                </p>
            )}
        </div>
    </div>
);

export default NotesTab;
