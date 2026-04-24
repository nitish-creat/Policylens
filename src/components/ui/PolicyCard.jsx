import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ExternalLink } from "lucide-react";
import { StatusBadge } from "./StatusBadge.jsx";
import { AlertToggle } from "./AlertToggle.jsx";
import { formatDate, formatDateRelative } from "../../utils/formatDate.js";
import { getCategoryColor } from "../../utils/categoryColors.js";

export const PolicyCard = ({ policy }) => {
  const categoryColor = getCategoryColor(policy.category);

  return (
    <div className="bg-navy-800 border border-electric-500/20 rounded-lg p-5 hover:border-electric-500/40 transition hover:shadow-glow-blue group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <Link
            to={`/policy/${policy.id}`}
            className="font-syne font-bold text-lg text-electric-300 hover:text-electric-200 transition"
          >
            {policy.name}
          </Link>
          <p className="text-sm text-navy-400 mt-1">
            {policy.region}, {policy.country}
          </p>
        </div>
        <AlertToggle policyId={policy.id} />
      </div>

      <p className="text-sm text-navy-300 mb-4 line-clamp-2">
        {policy.summary}
      </p>

      <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy-700">
        <div className="flex gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${categoryColor.badge}`}
          >
            {policy.category}
          </span>
          <StatusBadge status={policy.status} size="sm" />
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          <TrendingUp size={16} />
          <span className="text-sm font-semibold">{policy.impactScore}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-navy-400">
        <span>{formatDate(policy.date)}</span>
        <span className="text-navy-500">{formatDateRelative(policy.date)}</span>
      </div>

      <Link
        to={`/policy/${policy.id}`}
        className="inline-flex items-center gap-2 mt-4 text-electric-400 hover:text-electric-300 transition text-sm font-medium"
      >
        View Details <ExternalLink size={14} />
      </Link>
    </div>
  );
};
