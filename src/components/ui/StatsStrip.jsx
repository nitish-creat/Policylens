import React from "react";
import { Globe, Clock, AlertCircle } from "lucide-react";

export const StatsStrip = ({ stats }) => {
  const statItems = [
    {
      icon: Clock,
      label: "Tracked Today",
      value: stats?.tracked || 0,
      color: "text-electric-400",
    },
    {
      icon: Globe,
      label: "Countries Covered",
      value: stats?.countries || 0,
      color: "text-amber-400",
    },
    {
      icon: AlertCircle,
      label: "Active Proposals",
      value: stats?.activeProposals || 0,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statItems.map(({ icon: Icon, label, value, color }, idx) => (
        <div
          key={idx}
          className="bg-navy-800 border border-electric-500/20 rounded-lg p-4 hover:border-electric-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-navy-400 text-sm font-medium">{label}</p>
              <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
            </div>
            <div className={`${color} opacity-20`}>
              <Icon size={32} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
