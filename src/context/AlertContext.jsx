import React, { createContext, useState, useCallback, useEffect } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [watchedPolicies, setWatchedPolicies] = useState([]);

  // Load watched policies from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("watchedPolicies");
    if (saved) {
      try {
        setWatchedPolicies(JSON.parse(saved));
      } catch {
        setWatchedPolicies([]);
      }
    }
  }, []);

  // Save to localStorage whenever watched policies change
  useEffect(() => {
    localStorage.setItem("watchedPolicies", JSON.stringify(watchedPolicies));
  }, [watchedPolicies]);

  const toggleWatch = useCallback((policyId) => {
    setWatchedPolicies((prev) =>
      prev.includes(policyId)
        ? prev.filter((id) => id !== policyId)
        : [...prev, policyId],
    );
  }, []);

  const isWatched = useCallback(
    (policyId) => {
      return watchedPolicies.includes(policyId);
    },
    [watchedPolicies],
  );

  const getWatchedCount = useCallback(() => {
    return watchedPolicies.length;
  }, [watchedPolicies]);

  const value = {
    watchedPolicies,
    toggleWatch,
    isWatched,
    getWatchedCount,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
