import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { usePolicies } from "../hooks/usePolicies.js";
import { StatusBadge } from "../components/ui/StatusBadge.jsx";
import { AlertToggle } from "../components/ui/AlertToggle.jsx";
import { TimelineChart } from "../components/charts/TimelineChart.jsx";
import { formatDate, formatDateFull } from "../utils/formatDate.js";
import { getCategoryColor } from "../utils/categoryColors.js";

export const PolicyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPolicyById } = usePolicies();
  const policy = getPolicyById(parseInt(id));

  if (!policy) {
    return (
      <div className="p-6 text-center">
        <p className="text-navy-400 mb-4">Policy not found</p>
        <Link to="/" className="text-electric-400 hover:text-electric-300">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const categoryColor = getCategoryColor(policy.category);

  return (
    <div className="p-6 pb-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-electric-400 hover:text-electric-300 transition mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-navy-800 border border-electric-500/20 rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="font-syne font-bold text-3xl text-electric-300 mb-2">
              {policy.name}
            </h1>
            <p className="text-navy-400">
              {policy.region}, {policy.country}
            </p>
          </div>
          <AlertToggle policyId={policy.id} />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span
            className={`px-3 py-1.5 rounded text-sm font-medium ${categoryColor.badge}`}
          >
            {policy.category}
          </span>
          <StatusBadge status={policy.status} />
          <span className="text-amber-400 font-semibold">
            Impact: {policy.impactScore}/10
          </span>
        </div>

        <p className="text-navy-300 text-base leading-relaxed mb-4">
          {policy.description}
        </p>

        <div className="flex items-center gap-6 text-sm text-navy-400 pt-4 border-t border-navy-700">
          <div>
            <p className="font-medium text-navy-300">Date</p>
            <p>{formatDateFull(policy.date)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-navy-800 border border-electric-500/20 rounded-lg p-6">
          <h2 className="font-syne font-bold text-xl text-electric-300 mb-6">
            Timeline
          </h2>
          <TimelineChart events={policy.timeline} />
        </div>

        {/* Affected Sectors */}
        <div className="bg-navy-800 border border-electric-500/20 rounded-lg p-6">
          <h3 className="font-syne font-bold text-lg text-electric-300 mb-4">
            Affected Sectors
          </h3>
          <div className="space-y-2">
            {policy.affectedSectors.map((sector, idx) => (
              <div
                key={idx}
                className="px-3 py-2 bg-navy-700/50 border border-electric-500/20 rounded text-sm text-navy-300"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Policies */}
      {policy.relatedPolicies && policy.relatedPolicies.length > 0 && (
        <div className="bg-navy-800 border border-electric-500/20 rounded-lg p-6 mb-8">
          <h3 className="font-syne font-bold text-lg text-electric-300 mb-4">
            Related Policies
          </h3>
          <div className="flex gap-2">
            {policy.relatedPolicies.map((relatedId) => (
              <Link
                key={relatedId}
                to={`/policy/${relatedId}`}
                className="px-3 py-2 bg-electric-500/20 text-electric-300 hover:bg-electric-500/30 rounded transition"
              >
                Policy #{relatedId}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Source Links */}
      {policy.sourceLinks && policy.sourceLinks.length > 0 && (
        <div className="bg-navy-800 border border-electric-500/20 rounded-lg p-6">
          <h3 className="font-syne font-bold text-lg text-electric-300 mb-4">
            Source Links
          </h3>
          <div className="space-y-2">
            {policy.sourceLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-navy-700/50 hover:bg-navy-700 text-electric-400 hover:text-electric-300 rounded transition"
              >
                {link.title} <ExternalLink size={16} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
