import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import chroma from "chroma-js";

const ExpensesPieChart = ({ data }) => {
  const expensesData = data?.expenses?.byCategory || [];

  // Generate colors based on 2 base colors
  const colors = chroma
    .scale(["#FF6B6B", "#4ECDC4"])
    .mode("lab")
    .colors(expensesData.length);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full ">
      <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Expenses PieChart
      </h2>
      <div className="flex justify-center">
        <PieChart width={300} height={300}>
          <Pie
            data={expensesData}
            dataKey="total"
            nameKey="category"
            outerRadius={100}
            label
            labelLine={false}
          >
            {expensesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {expensesData.map((entry, index) => (
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

export default ExpensesPieChart;
