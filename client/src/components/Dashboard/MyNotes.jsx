import { useEffect, useState, useMemo } from "react";
import VideoCard from "../utils/VideoCard";
import VideoCardSkeleton from "../utils/VideoCardSkeleton";
import { getAllNotes } from "../../api/apiCalls.js";
import EmptyNotes from "../utils/EmptyNotes.jsx";
import { useOutletContext } from "react-router-dom";


const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search = "" } = useOutletContext() || {};

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();

        setNotes(data.notes || data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = search
  ? notes.filter((note) =>
      note.title?.toLowerCase().includes(search.toLowerCase())
    )
  : notes;


  return (
    <div className="md:px-6 py-6">
      <h2 className="text-3xl font-semibold mb-2">My Notes</h2>
      <p className="text-zinc-400 mb-6">
        Manage your processed videos and notes
      </p>



      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {loading && Array.from({ length: 6 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}

        {!loading && filteredNotes.length > 0 &&
          filteredNotes.map((note) => (
            <VideoCard key={note._id} note={note} />
          ))
        }


      </div>

      {!loading && filteredNotes.length === 0 && <EmptyNotes />}


    </div>
  );
};

export default MyNotes;
