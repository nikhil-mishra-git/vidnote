import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#101010] text-zinc-400">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              VidNote AI
            </h2>
            <p className="mt-1 text-sm max-w-sm">
              Turn YouTube videos into clean, structured notes using AI.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-white transition">
              Features
            </Link>
            <Link to="/" className="hover:text-white transition">
              How it works
            </Link>
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-white transition">
              Get Started
            </Link>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-3">

          <p>
            © {new Date().getFullYear()} VidNote AI · Built by Nikhil Mishra
          </p>

          <p className="text-zinc-600">
            Learning made smarter with AI
          </p>

        </div>

      </div>
    </footer>
  );
}
