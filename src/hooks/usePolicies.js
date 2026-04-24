import { useContext } from "react";
import { PolicyContext } from "../context/PolicyContext";

export const usePolicies = () => {
  const context = useContext(PolicyContext);
  if (!context) {
    throw new Error("usePolicies must be used within a PolicyProvider");
  }
  return context;
};
