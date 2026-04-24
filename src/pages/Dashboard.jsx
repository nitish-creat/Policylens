import React, { useState } from "react";
import { usePolicies } from "../hooks/usePolicies.js";
import { PolicyCard } from "../components/ui/PolicyCard";
import { StatsStrip } from "../components/ui/StatsStrip";
import { SearchBar } from "../components/ui/SearchBar";
import { FilterPanel } from "../components/ui/FilterPanel";

export const Dashboard = () => {
  const { policies, searchPolicies, filterPolicies, getStats } = usePolicies();
  const [filteredPolicies, setFilteredPolicies] = useState(policies);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  const handleSearch = (query) => {
    setSearchTerm(query);
    applyFilters(query, activeFilters);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    applyFilters(searchTerm, filters);
  };

  const applyFilters = (search, filters) => {
    let result = policies;

    if (search) {
      result = searchPolicies(search);
    }

    if (
      filters.category?.length ||
      filters.status?.length ||
      filters.country?.length
    ) {
      result = filterPolicies({
        category: filters.category,
        status: filters.status,
        country: filters.country,
      });
    }

    setFilteredPolicies(result);
  };

  const stats = getStats();

  return (
    <div className="p-6 pb-20">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-4xl text-electric-300 mb-2">
          PolicyPulse Dashboard
        </h1>
        <p className="text-navy-400">
          Real-time government policy change tracking
        </p>
      </div>

      <div className="mb-8">
        <StatsStrip stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <SearchBar
            onSearch={handleSearch}
            onClear={() => handleSearch("")}
            placeholder="Search policies by name, category, or country..."
          />
        </div>
        <div className="lg:col-span-1">
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div>
        <h2 className="font-syne font-bold text-xl text-electric-300 mb-4">
          Recent Policies{" "}
          {filteredPolicies.length > 0 && (
            <span className="text-amber-400">({filteredPolicies.length})</span>
          )}
        </h2>

        {filteredPolicies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-navy-400 text-lg">
              No policies found matching your criteria.
            </p>
            <button
              onClick={() => {
                handleSearch("");
                handleFilterChange({});
              }}
              className="mt-4 px-4 py-2 bg-electric-500 hover:bg-electric-400 text-navy-900 font-medium rounded transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPolicies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
