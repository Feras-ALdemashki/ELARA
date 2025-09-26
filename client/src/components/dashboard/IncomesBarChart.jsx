import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import chroma from "chroma-js";

const IncomesBarChart = ({ data }) => {
  const rawIncomesData = data?.income?.byCategory || [];

  // Remove entries without category or total
  const incomesData = rawIncomesData.filter(
    (item) => item.category && item.total > 0
  );

  // Generate colors only for filtered data
  const colors = chroma
    .scale(["#4ECDC4", "#af3a40"])
    .mode("lab")
    .colors(incomesData.length);

  return (
    <div className=" p-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Income Chart
      </h2>

      {incomesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-500 mb-4 text-center">
            No income data yet. Add your first income to get started!
          </p>
        </div>
      ) : (
        <>
          {/* Chart Section */}
          <div className="flex justify-center items-center">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={incomesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total">
                  {incomesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Section */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {incomesData.map((entry, index) => (
              <div
                key={entry.category}
                className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg shadow-sm"
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                ></span>
                <span className="text-sm font-medium text-gray-700">
                  {entry.category}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default IncomesBarChart;
