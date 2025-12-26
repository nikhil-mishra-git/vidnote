import React, { useMemo, useState } from "react";
import {
  FiMail,
  FiCalendar,
  FiLogOut,
  FiTrash2,
  FiCamera,
} from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmDelete from "../utils/ConfirmDelete.jsx";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser, deleteAccount } from "../../api/apiCalls";
import { clearAuth } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [name, setName] = useState("");

  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  const joined = useMemo(() => {
    if (!user?.createdAt) return "—";
    const date = new Date(user.createdAt);
    return isNaN(date)
      ? "—"
      : date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
  }, [user]);

  const onLogout = async () => {
    try {
      const res = await logoutUser();
      if (res?.success) {
        dispatch(clearAuth());
        toast.success(res.message);
        navigate("/");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteAccount();
      if (res?.success) {
        toast.success(res.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full md:px-6 py-6 font-mono text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Profile Settings</h1>
          <p className="text-gray-400 text-sm">
            Manage your account information
          </p>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600/20 border border-red-600/40 px-4 py-2 rounded-lg text-sm hover:bg-red-600/30 transition"
        >
          <FiLogOut className="text-red-400" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">

          {/* AVATAR */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <img
                src={`https://api.dicebear.com/7.x/micah/svg?seed=${name}`}
                alt="avatar"
                className="rounded-full border border-white/10"
              />
              <div className="absolute bottom-0 right-0 bg-black/80 p-1.5 rounded-full">
                <FiCamera className="text-white text-sm" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>

          <hr className="my-8 border-white/10" />

          {/* FORM */}
          <div className="space-y-6">

            <div>
              <label className="text-xs text-gray-400 uppercase">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase">
                Email Address
              </label>
              <div className="flex items-center gap-3 mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <FiMail className="text-gray-400 text-sm" />
                <input
                  type="email"
                  readOnly
                  value={user.email}
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
              </div>
            </div>

          </div>

          <button
            disabled
            className="mt-6 px-6 py-2.5 bg-[#24cfa6]/60 text-black rounded-lg text-sm font-semibold cursor-not-allowed"
          >
            Update Profile (Coming Soon)
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-fit">

          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FiCalendar className="text-[#24cfa6]" /> Account Stats
          </h2>

          <div className="mt-6 space-y-4">

            <Stat label="Notes Generated" value={user?.notes?.length || 0} />
            <Stat label="MCQs Created" value={(user?.notes?.length || 0) * 5} />
            <Stat label="Member Since" value={joined} />

          </div>
        </div>
      </div>

      {/* DANGER */}
      <div className="mt-12 border border-red-600/30 rounded-2xl p-8">
        <h2 className="text-lg font-semibold text-red-500 flex items-center gap-2">
          <FiTrash2 /> Danger Zone
        </h2>

        <div className="flex justify-between mt-8">
          <p className="text-gray-400 text-sm">
            Permanently delete your account and all data
          </p>

          <button
            onClick={() => setConfirmOpen(true)}
            className="px-6 py-2.5 bg-red-800 hover:bg-red-700 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <FiTrash2 /> Delete Account
          </button>
        </div>
      </div>

      <ConfirmDelete
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          handleDelete();
        }}
      />
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-black/20 px-4 py-3 rounded-xl border border-white/10 flex justify-between">
    <span className="text-gray-300 text-sm">{label}</span>
    <span className="font-semibold text-white">{value}</span>
  </div>
);

export default Profile;
