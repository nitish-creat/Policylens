import React, { useState } from "react";
import { Search, X } from "lucide-react";

export const SearchBar = ({
  onSearch,
  onClear,
  placeholder = "Search policies...",
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-3.5 text-navy-400" size={18} />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-navy-800 border border-electric-500/20 rounded-lg pl-10 pr-10 py-2.5 text-navy-100 placeholder-navy-500 focus:outline-none focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20 transition"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-3.5 text-navy-400 hover:text-electric-400 transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};
