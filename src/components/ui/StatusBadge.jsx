import React from "react";
import { getStatusColor } from "../../utils/categoryColors.js";

export const StatusBadge = ({ status, size = "md" }) => {
  const colors = getStatusColor(status);
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`rounded-full font-medium ${colors.badge} ${sizeClasses[size]}`}
    >
      {status}
    </span>
  );
};
