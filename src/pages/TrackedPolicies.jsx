import React from "react";
import { usePolicies } from "../hooks/usePolicies.js";
import { useAlerts } from "../hooks/useFilters.js";
import { PolicyCard } from "../components/ui/PolicyCard";

export const TrackedPolicies = () => {
  const { policies, getPolicyById } = usePolicies();
  const { watchedPolicies } = useAlerts();

  const watchedPoliciesList = watchedPolicies
    .map((id) => getPolicyById(id))
    .filter(Boolean);

  return (
    <div className="p-6 pb-20">
      <h1 className="font-syne font-bold text-4xl text-electric-300 mb-2">
        Watched Policies
      </h1>
      <p className="text-navy-400 mb-8">Policies you're actively tracking</p>

      {watchedPoliciesList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-navy-400 text-lg mb-4">
            You haven't watched any policies yet.
          </p>
          <p className="text-navy-500">
            Click the bell icon on any policy card to start tracking.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="font-syne font-bold text-xl text-electric-300 mb-4">
            {watchedPoliciesList.length} Watched{" "}
            {watchedPoliciesList.length === 1 ? "Policy" : "Policies"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {watchedPoliciesList.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
