import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import chroma from "chroma-js";

const IncomesBarChart = ({ data }) => {
  const incomesData = data?.income?.byCategory || [];

  // Generate colors based on 2 base colors
  const colors = chroma
    .scale(["#4ECDC4", "#1A535C"])
    .mode("lab")
    .colors(incomesData.length);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Income chart
      </h2>

      <div className="flex justify-center">
        <BarChart width={400} height={300} data={incomesData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total">
            {incomesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* Legend below chart */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {incomesData.map((entry, index) => (
          <div key={entry.category} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[index] }}
            ></span>
            <span className="text-sm font-medium">{entry.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomesBarChart;
