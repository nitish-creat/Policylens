import React from "react";
import { formatDate } from "../../utils/formatDate.js";

export const TimelineChart = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-navy-400 py-8">
        No timeline events available
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {events.map((event, idx) => (
        <div key={idx} className="flex gap-4 pb-6 relative">
          {/* Timeline line */}
          {idx < events.length - 1 && (
            <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-electric-500/50 to-transparent" />
          )}

          {/* Timeline dot */}
          <div className="relative z-10">
            <div className="w-3 h-3 bg-electric-500 rounded-full mt-2 ring-4 ring-navy-800" />
          </div>

          {/* Content */}
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium text-electric-300">
              {event.event}
            </p>
            <p className="text-xs text-navy-400 mt-1">
              {formatDate(event.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
