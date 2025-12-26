import { MdOutlineNoteAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AnimateSvg from "../utils/Push notifications.gif";

const EmptyNotes = () => {
  const navigate = useNavigate();

  return (
    <div className="col-span-full flex flex-col md:flex-row items-center justify-center gap-10 py-20 px-4 text-center md:text-left">

      {/* Image */}
      <img
        src={AnimateSvg}
        alt="No notes"
        className="w-64 sm:w-72 md:w-80 opacity-90"
      />

      {/* Content */}
      <div className="max-w-md">
        <h3 className="text-2xl font-semibold mb-2">
          Oops! No notes found
        </h3>

        <p className="text-zinc-400 mb-6">
          You haven’t created any notes yet. 
        </p>

        <button
          onClick={() => navigate("/dashboard/new-note")}
          className="inline-flex items-center gap-2 bg-[#24cfa6] text-black px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          <MdOutlineNoteAdd size={18} />
          Create New Note
        </button>
      </div>

    </div>
  );
};

export default EmptyNotes;
