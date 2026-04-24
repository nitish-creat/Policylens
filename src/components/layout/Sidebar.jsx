import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Search, Clock, AlertCircle } from "lucide-react";

export const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/search", label: "Search", icon: Search },
    { path: "/timeline", label: "Timeline", icon: Clock },
    { path: "/tracked", label: "Watched", icon: AlertCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-navy-800 border-r border-electric-500/20 w-64 p-4 overflow-y-auto z-30 transform transition-transform lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="space-y-2">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2 rounded transition ${
              isActive(path)
                ? "bg-electric-500/20 text-electric-300 border-l-2 border-electric-500"
                : "text-navy-300 hover:text-electric-300 hover:bg-navy-700/50"
            }`}
          >
            <Icon size={18} />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-navy-700">
        <p className="text-xs text-navy-400 px-4 mb-4 font-syne font-semibold">
          CATEGORIES
        </p>
        <div className="space-y-1">
          {[
            "Healthcare",
            "Tax",
            "Environment",
            "Education",
            "Labor",
            "Defense",
          ].map((cat) => (
            <Link
              key={cat}
              to={`/search?category=${cat}`}
              className="block px-4 py-2 text-sm text-navy-300 hover:text-electric-300 transition rounded hover:bg-navy-700/50"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
