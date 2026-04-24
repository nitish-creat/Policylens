import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FilterPanel = ({ onFilterChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    statuses: [],
    countries: [],
  });

  const categories = [
    "Healthcare",
    "Tax",
    "Environment",
    "Education",
    "Labor",
    "Defense",
  ];
  const statuses = ["Proposed", "Passed", "Repealed", "Amended"];
  const countries = [
    "United States",
    "United Kingdom",
    "European Union",
    "Canada",
  ];

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters };
    const filterArray = newFilters[type];

    if (filterArray.includes(value)) {
      newFilters[type] = filterArray.filter((v) => v !== value);
    } else {
      newFilters[type] = [...filterArray, value];
    }

    setFilters(newFilters);
    onFilterChange({
      category: newFilters.categories,
      status: newFilters.statuses,
      country: newFilters.countries,
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.statuses.length > 0 ||
    filters.countries.length > 0;

  return (
    <div className="bg-navy-800 border border-electric-500/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-navy-700/50 transition"
      >
        <span className="font-medium text-electric-300">
          Filters{" "}
          {hasActiveFilters && (
            <span className="text-amber-400 ml-2">
              (
              {filters.categories.length +
                filters.statuses.length +
                filters.countries.length}
              )
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`transition ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="border-t border-navy-700 p-4 space-y-4 bg-navy-800/50">
          {/* Category Filter */}
          <div>
            <p className="text-xs font-syne font-semibold text-navy-400 mb-2">
              CATEGORY
            </p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => handleFilterChange("categories", cat)}
                    className="w-4 h-4 rounded accent-electric-500"
                  />
                  <span className="text-sm text-navy-300 group-hover:text-electric-300 transition">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <p className="text-xs font-syne font-semibold text-navy-400 mb-2">
              STATUS
            </p>
            <div className="space-y-1">
              {statuses.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes(status)}
                    onChange={() => handleFilterChange("statuses", status)}
                    className="w-4 h-4 rounded accent-electric-500"
                  />
                  <span className="text-sm text-navy-300 group-hover:text-electric-300 transition">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Country Filter */}
          <div>
            <p className="text-xs font-syne font-semibold text-navy-400 mb-2">
              COUNTRY
            </p>
            <div className="space-y-1">
              {countries.map((country) => (
                <label
                  key={country}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.countries.includes(country)}
                    onChange={() => handleFilterChange("countries", country)}
                    className="w-4 h-4 rounded accent-electric-500"
                  />
                  <span className="text-sm text-navy-300 group-hover:text-electric-300 transition">
                    {country}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setFilters({ categories: [], statuses: [], countries: [] });
                onFilterChange({ category: [], status: [], country: [] });
              }}
              className="w-full px-3 py-1.5 bg-navy-700 hover:bg-navy-600 text-navy-300 hover:text-electric-300 transition text-sm rounded mt-2"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};
