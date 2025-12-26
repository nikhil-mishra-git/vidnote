import { NavLink, useLocation } from "react-router-dom";
import { MdVideoLibrary } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaBook } from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const linkClass = ({ isActive }) =>
    `px-4 py-3 rounded-md flex items-center gap-3 transition
     ${isActive
      ? "bg-[#24cfa6] text-black"
      : "text-zinc-400 hover:bg-zinc-900"
    }`;

  const location = useLocation();

  const isMyNotesActive =
    location.pathname === "/dashboard" ||
    location.pathname.startsWith("/dashboard/my-notes");

  return (
    <div
      className={`
        fixed md:static z-50
        w-64 min-h-screen bg-[#101010]
        border-r border-zinc-800 px-6 py-10
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 text-white text-lg font-mono mb-10">
        <FaBook size={24} />
        <span>VidNote AI</span>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-4">

        <NavLink
          to="/dashboard/my-notes"
          onClick={() => setSidebarOpen(false)}
          className={`px-4 py-3 rounded-md flex items-center gap-3 transition
            ${isMyNotesActive
              ? "bg-[#24cfa6] text-black"
              : "text-zinc-400 hover:bg-zinc-900"
            }`}
        >
          <FaBook size={20} />
          My Notes
        </NavLink>

        <NavLink
          to="/dashboard/new-note"
          onClick={() => setSidebarOpen(false)}
          className={linkClass}
        >
          <MdVideoLibrary size={20} />
          New Note
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          onClick={() => setSidebarOpen(false)}
          className={linkClass}
        >
          <CgProfile size={20} />
          Profile
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
