import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const ImpactChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-navy-800 border border-electric-500/20 rounded-lg p-6 text-center">
        <p className="text-navy-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-navy-800 border border-electric-500/20 rounded-lg p-6">
      <h3 className="font-syne font-bold text-lg text-electric-300 mb-4">
        Impact Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(10, 29, 46, 0.95)",
              border: "1px solid rgba(14, 165, 233, 0.3)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#e0f2fe" }}
          />
          <Legend />
          <Bar dataKey="impact" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
