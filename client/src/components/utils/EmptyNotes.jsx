import { MdOutlineNoteAdd } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const EmptyNotes = () => {
  const navigate = useNavigate();

  return (
    <div className="relative col-span-full flex flex-col items-center justify-center gap-6 py-14 px-4 text-center">

      <div className="absolute z-0 bottom-5 left-30 md:left-130 w-[200px] md:w-[320px] h-[120px] md:h-[220px] bg-[#24cfa6]/20 blur-[80px] md:blur-[100px] rounded-full"></div>

      <div>
        <HiOutlineDocumentText className="w-12 h-12 text-zinc-400 my-6 mx-auto" />

        <h3 className="text-2xl font-semibold mb-2">
          No notes yet
        </h3>

        <p className="text-zinc-400 mb-6">
          Create your first note from a YouTube video.
        </p>

        <button
          onClick={() => navigate("/dashboard/new-note")}
          className="inline-flex cursor-pointer items-center gap-2 bg-[#24cfa6] text-black px-6 py-3 rounded-full text-sm hover:opacity-90 transition"
        >
          <MdOutlineNoteAdd size={18} />
          Create New Note
        </button>
      </div>

    </div>
  );
};

export default EmptyNotes;
