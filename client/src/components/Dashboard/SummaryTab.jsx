import { FiFileText } from "react-icons/fi";

const SummaryTab = ({ summary }) => (
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

    <p className="text-gray-300 text-base leading-relaxed">
      {summary || "No summary available."}
    </p>
  </div>
);

export default SummaryTab;
