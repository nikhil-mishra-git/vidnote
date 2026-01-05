import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen w-full flex bg-[#101010] text-white font-mono relative">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <div className="flex-1 flex flex-col relative overflow-hidden">

        <Topbar
          setSidebarOpen={setSidebarOpen}
          search={search}
          setSearch={setSearch}
        />

        <div className="flex-1 overflow-y-auto px-3 py-6">
          <Outlet search={search} />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;