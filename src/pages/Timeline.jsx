import React, { useState } from "react";
import { usePolicies } from "../hooks/usePolicies.js";
import { TimelineChart } from "../components/charts/TimelineChart.jsx";
import { formatDate } from "../utils/formatDate.js";
import { StatusBadge } from "../components/ui/StatusBadge.jsx";
import { getCategoryColor } from "../utils/categoryColors.js";

export const Timeline = () => {
  const { policies } = usePolicies();

  // Sort policies by date in descending order
  const sortedPolicies = [...policies].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="p-6 pb-20">
      <h1 className="font-syne font-bold text-4xl text-electric-300 mb-2">
        Policy Timeline
      </h1>
      <p className="text-navy-400 mb-8">
        Chronological view of all policy changes
      </p>

      <div className="bg-navy-800 border border-electric-500/20 rounded-lg p-8">
        <div className="space-y-8">
          {sortedPolicies.map((policy, idx) => {
            const categoryColor = getCategoryColor(policy.category);

            return (
              <div key={policy.id} className="flex gap-6">
                {/* Timeline line and dot */}
                <div className="relative">
                  {idx < sortedPolicies.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-electric-500/50 to-transparent -translate-x-2" />
                  )}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-electric-500 rounded-full ring-4 ring-navy-800" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-syne font-bold text-lg text-electric-300">
                      {policy.name}
                    </h3>
                    <StatusBadge status={policy.status} size="sm" />
                  </div>

                  <p className="text-sm text-navy-400 mb-3">{policy.summary}</p>

                  <div className="flex items-center gap-4 text-xs text-navy-500">
                    <span
                      className={`px-2 py-1 rounded ${categoryColor.badge}`}
                    >
                      {policy.category}
                    </span>
                    <span>
                      {policy.region}, {policy.country}
                    </span>
                    <span>{formatDate(policy.date)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
