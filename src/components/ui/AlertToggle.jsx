import React from "react";
import { Bell, BellOff } from "lucide-react";
import { useAlerts } from "../../hooks/useFilters.js";

export const AlertToggle = ({ policyId }) => {
  const { toggleWatch, isWatched } = useAlerts();
  const watched = isWatched(policyId);

  return (
    <button
      onClick={() => toggleWatch(policyId)}
      className={`p-2 rounded transition ${
        watched
          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
          : "bg-navy-700 text-navy-400 hover:bg-navy-600 hover:text-electric-400"
      }`}
      title={watched ? "Stop watching" : "Watch this policy"}
    >
      {watched ? <Bell size={18} /> : <BellOff size={18} />}
    </button>
  );
};
