import { FiFileText } from "react-icons/fi";

const SummaryTab = ({ summary }) => {
  const sentences = summary
    ? summary.split(".").filter(line => line.trim() !== "")
    : [];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 shadow-lg transition-all hover:shadow-2xl">

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700">
          <FiFileText className="text-blue-400 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-white tracking-wide">
          Summary
        </h3>
      </div>

      <div className="h-px bg-zinc-700 mb-4" />

      {sentences.length > 0 ? (
        <ul className="space-y-3 list-disc list-inside text-gray-300 text-base leading-relaxed">
          {sentences.map((line, index) => (
            <li key={index} className="text-justify">
              {line.trim()}.
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No summary available.</p>
      )}
    </div>
  );
};

export default SummaryTab;
