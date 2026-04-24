import { format, formatDistanceToNow, parse } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";
  try {
    const parsedDate =
      typeof date === "string"
        ? parse(date, "yyyy-MM-dd", new Date())
        : new Date(date);
    return format(parsedDate, "MMM dd, yyyy");
  } catch {
    return "";
  }
};

export const formatDateFull = (date) => {
  if (!date) return "";
  try {
    const parsedDate =
      typeof date === "string"
        ? parse(date, "yyyy-MM-dd", new Date())
        : new Date(date);
    return format(parsedDate, "EEEE, MMMM dd, yyyy");
  } catch {
    return "";
  }
};

export const formatDateRelative = (date) => {
  if (!date) return "";
  try {
    const parsedDate =
      typeof date === "string"
        ? parse(date, "yyyy-MM-dd", new Date())
        : new Date(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch {
    return "";
  }
};

export const formatDateShort = (date) => {
  if (!date) return "";
  try {
    const parsedDate =
      typeof date === "string"
        ? parse(date, "yyyy-MM-dd", new Date())
        : new Date(date);
    return format(parsedDate, "MM/dd/yy");
  } catch {
    return "";
  }
};
