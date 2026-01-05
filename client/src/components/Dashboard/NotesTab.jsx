import { FiEdit3 } from "react-icons/fi";

const NotesTab = ({ notes }) => {
  const formattedNotes = notes
    ? notes
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
    : [];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 shadow-lg transition-all hover:shadow-2xl space-y-10">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          <FiEdit3 className="text-blue-400 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-white">Notes</h3>
      </div>

      {/* Notes Content */}
      <div className="grid grid-cols-1 gap-6">
        {formattedNotes.length > 0 ? (
          formattedNotes.map((note, index) => (
            <div
              key={index}
              className="relative bg-white/5 border border-white/10 p-5 rounded-2xl 
              shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Index Badge */}
              <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full 
                bg-zinc-900 border border-white/10 
                flex items-center justify-center text-xs text-blue-400 font-semibold">
                {index + 1}
              </span>

              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {note.replace(/^- /, "")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default NotesTab;
