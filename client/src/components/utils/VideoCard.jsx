import { FiCalendar, FiClock, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ note }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-zinc-700 transition-all duration-300 cursor-pointer group">

      {/* Thumbnail */}
      <div className="relative">
        <img
          src={note.thumbnail}
          alt={note.title}
          className="w-full h-64 object-cover "
        />
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
          {note.duration}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-40">
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {note.title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center justify-between gap-4 text-xs text-zinc-400">

          <span className="flex items-center gap-1">
            <FiCalendar /> {new Date(note.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </span>

          {/* Action Button */}
            <button
              onClick={() => navigate(`/dashboard/my-notes/detail-note/${note._id}`)}
              className="flex items-center gap-1 text-[#24cfa6] text-sm px-3 py-2 cursor-pointer border border-[#24cfa6] rounded-lg hover:bg-[#24cfa6]/10 transition-all duration-300"
            >
              <FiEye /> View Notes
            </button>

        </div>


      </div>

    </div>
  );
};

export default VideoCard;
