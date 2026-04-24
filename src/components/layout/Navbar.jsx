import React from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { useAlerts } from "../../hooks/useFilters.js";

export const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { getWatchedCount } = useAlerts();

  return (
    <nav className="bg-navy-900 border-b border-electric-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-electric-400 hover:text-electric-300 transition"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-electric-500 to-amber-500 rounded flex items-center justify-center">
            <span className="text-navy-900 font-bold text-sm">PP</span>
          </div>
          <span className="font-syne font-bold text-lg text-electric-300 hidden sm:inline">
            PolicyPulse
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/tracked"
          className="relative text-electric-400 hover:text-electric-300 transition"
        >
          <Bell size={20} />
          {getWatchedCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-navy-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getWatchedCount()}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};
