import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePolicies } from "../hooks/usePolicies.js";
import { PolicyCard } from "../components/ui/PolicyCard";
import { SearchBar } from "../components/ui/SearchBar";
import { FilterPanel } from "../components/ui/FilterPanel";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const { policies, searchPolicies, filterPolicies } = usePolicies();
  const [filteredPolicies, setFilteredPolicies] = useState(policies);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("q") || searchParams.get("category") || "",
  );

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const filtered = filterPolicies({
        category: [category],
        status: [],
        country: [],
      });
      setFilteredPolicies(filtered);
      setSearchTerm(category);
    }
  }, [searchParams, filterPolicies]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    if (query.trim()) {
      const results = searchPolicies(query);
      setFilteredPolicies(results);
    } else {
      setFilteredPolicies(policies);
    }
  };

  const handleFilterChange = (filters) => {
    if (searchTerm) {
      const searchResults = searchPolicies(searchTerm);
      const filtered =
        filters.category?.length ||
        filters.status?.length ||
        filters.country?.length
          ? searchResults.filter(
              (p) =>
                (!filters.category?.length ||
                  filters.category.includes(p.category)) &&
                (!filters.status?.length ||
                  filters.status.includes(p.status)) &&
                (!filters.country?.length ||
                  filters.country.includes(p.country)),
            )
          : searchResults;
      setFilteredPolicies(filtered);
    } else {
      const filtered = filterPolicies({
        category: filters.category,
        status: filters.status,
        country: filters.country,
      });
      setFilteredPolicies(filtered);
    }
  };

  return (
    <div className="p-6 pb-20">
      <h1 className="font-syne font-bold text-4xl text-electric-300 mb-2">
        Search Policies
      </h1>
      <p className="text-navy-400 mb-8">
        Find policies by keyword, category, or filter criteria
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <SearchBar
            onSearch={handleSearch}
            onClear={() => handleSearch("")}
            placeholder="Search by name, category, or country..."
          />
        </div>
        <div className="lg:col-span-1">
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>
      </div>

      {filteredPolicies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-navy-400 text-lg">No policies found.</p>
        </div>
      ) : (
        <div>
          <h2 className="font-syne font-bold text-xl text-electric-300 mb-4">
            Results ({filteredPolicies.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPolicies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
