import React, { createContext, useState, useCallback } from "react";
import { mockPolicies } from "../data/mockPolicies";

export const PolicyContext = createContext();

export const PolicyProvider = ({ children }) => {
  const [policies, setPolicies] = useState(mockPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPolicyById = useCallback(
    (id) => {
      return policies.find((policy) => policy.id === id);
    },
    [policies],
  );

  const searchPolicies = useCallback(
    (query) => {
      if (!query.trim()) return policies;

      const lowerQuery = query.toLowerCase();
      return policies.filter(
        (policy) =>
          policy.name.toLowerCase().includes(lowerQuery) ||
          policy.summary.toLowerCase().includes(lowerQuery) ||
          policy.country.toLowerCase().includes(lowerQuery) ||
          policy.category.toLowerCase().includes(lowerQuery),
      );
    },
    [policies],
  );

  const filterPolicies = useCallback(
    (filters) => {
      let filtered = [...policies];

      if (filters.category && filters.category.length > 0) {
        filtered = filtered.filter((p) =>
          filters.category.includes(p.category),
        );
      }

      if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter((p) => filters.status.includes(p.status));
      }

      if (filters.country && filters.country.length > 0) {
        filtered = filtered.filter((p) => filters.country.includes(p.country));
      }

      if (filters.dateRange) {
        const { start, end } = filters.dateRange;
        filtered = filtered.filter((p) => {
          const policyDate = new Date(p.date);
          return policyDate >= start && policyDate <= end;
        });
      }

      return filtered;
    },
    [policies],
  );

  const getStats = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayPolicies = policies.filter((p) => p.date === today);
    const countries = new Set(policies.map((p) => p.country)).size;
    const activeProposals = policies.filter(
      (p) => p.status === "Proposed",
    ).length;

    return {
      tracked: todayPolicies.length,
      countries,
      activeProposals,
    };
  }, [policies]);

  const value = {
    policies,
    selectedPolicy,
    setSelectedPolicy,
    loading,
    setLoading,
    error,
    setError,
    getPolicyById,
    searchPolicies,
    filterPolicies,
    getStats,
  };

  return (
    <PolicyContext.Provider value={value}>{children}</PolicyContext.Provider>
  );
};
