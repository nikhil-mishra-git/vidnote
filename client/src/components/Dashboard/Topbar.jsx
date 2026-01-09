import React, { useState, useEffect, useRef } from "react";
import { FiUser, FiLogOut, FiSearch, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "../../store/authSlice";
import { logoutUser } from "../../api/apiCalls";

const Topbar = ({ setSidebarOpen, search, setSearch }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      const res = await logoutUser();
      if (res?.success) {
        dispatch(clearAuth());
        toast.success(res?.message);
        navigate("/");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="sticky top-0 z-30 border-b border-zinc-800 bg-[#101010] px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center justify-between w-full sm:justify-start sm:w-fit gap-3 sm:gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition"
        >
          <FiMenu size={22} />
        </button>

        {/* Search */}
        <div className="relative">
          <FiSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400"
            size={16}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              navigate("/dashboard/my-notes");
            }}
            placeholder="Search notes..."
            className="bg-zinc-900 border border-zinc-700 pl-11 pr-4 py-2.5 sm:py-3 rounded-md w-full text-sm outline-none focus:border-[#24cfa6] transition min-w-[200px] sm:min-w-[250px] md:min-w-[300px]"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div ref={dropdownRef} className="relative hidden sm:block ">
        <div className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.name}`}
            alt="avatar"
            onClick={() => setOpen(!open)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-800 border border-zinc-600 cursor-pointer hover:opacity-90 transition"
          />  
        </div>

        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-[#141414] border border-zinc-700 rounded-xl shadow-xl p-3 z-40">
            <button
              onClick={() => {
                navigate("/dashboard/profile");
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg hover:bg-zinc-800 text-sm transition"
            >
              <FiUser /> Profile
            </button>

            <button
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full mt-1 px-3 py-2.5 rounded-lg hover:bg-zinc-800 text-sm text-red-400 transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}

    </div>
  );
};

export default Topbar;