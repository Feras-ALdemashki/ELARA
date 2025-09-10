import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import chroma from "chroma-js";

const ExpensesPieChart = ({ data }) => {
  const expensesData = data?.expenses?.byCategory || [];

  // Generate colors dynamically
  const colors = chroma
    .scale(["#FF6B6B", "#4ECDC4"])
    .mode("lab")
    .colors(expensesData.length);

  return (
    <div className="  p-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Expenses Chart
      </h2>

      {expensesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-500 mb-4 text-center">
            No expense data yet. Add your first expense to get started!
          </p>
        </div>
      ) : (
        <>
          {/* Chart Section */}
          <div className="flex justify-center items-center">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={expensesData}
                  dataKey="total"
                  nameKey="category"
                  outerRadius={120}
                  label
                  labelLine={false}
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Section */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {expensesData.map((entry, index) => (
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

export default ExpensesPieChart;
