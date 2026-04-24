export const categoryColors = {
  Healthcare: {
    bg: "bg-blue-900/20",
    border: "border-blue-500",
    text: "text-blue-400",
    dot: "bg-blue-500",
    badge: "bg-blue-500/20 text-blue-300",
  },
  Tax: {
    bg: "bg-amber-900/20",
    border: "border-amber-500",
    text: "text-amber-400",
    dot: "bg-amber-500",
    badge: "bg-amber-500/20 text-amber-300",
  },
  Environment: {
    bg: "bg-green-900/20",
    border: "border-green-500",
    text: "text-green-400",
    dot: "bg-green-500",
    badge: "bg-green-500/20 text-green-300",
  },
  Education: {
    bg: "bg-purple-900/20",
    border: "border-purple-500",
    text: "text-purple-400",
    dot: "bg-purple-500",
    badge: "bg-purple-500/20 text-purple-300",
  },
  Labor: {
    bg: "bg-red-900/20",
    border: "border-red-500",
    text: "text-red-400",
    dot: "bg-red-500",
    badge: "bg-red-500/20 text-red-300",
  },
  Defense: {
    bg: "bg-slate-900/20",
    border: "border-slate-500",
    text: "text-slate-400",
    dot: "bg-slate-500",
    badge: "bg-slate-500/20 text-slate-300",
  },
};

export const getCategoryColor = (category) => {
  return categoryColors[category] || categoryColors.Healthcare;
};

export const statusColors = {
  Proposed: {
    badge: "bg-electric-500/20 text-electric-300",
    dot: "bg-electric-500",
    border: "border-electric-500",
  },
  Passed: {
    badge: "bg-green-500/20 text-green-300",
    dot: "bg-green-500",
    border: "border-green-500",
  },
  Repealed: {
    badge: "bg-red-500/20 text-red-300",
    dot: "bg-red-500",
    border: "border-red-500",
  },
  Amended: {
    badge: "bg-amber-500/20 text-amber-300",
    dot: "bg-amber-500",
    border: "border-amber-500",
  },
};

export const getStatusColor = (status) => {
  return statusColors[status] || statusColors.Proposed;
};
