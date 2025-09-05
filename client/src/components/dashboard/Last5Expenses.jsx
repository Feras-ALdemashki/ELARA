import React from "react";
import Button from "../Button";

import { GoArrowRight, GoPlus } from "react-icons/go";
const Last5Expenses = ({ data, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-accent2">Expenses</h2>
        <div className="flex gap-2">
          <Button name="See All" icon={GoArrowRight} onClick={() => {}} />
          <Button name="Add Expense" icon={GoPlus} onClick={onClick} />
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
        {data.expenses.last5.map((expense) => (
          <div
            key={expense._id}
            className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-2 last:border-none"
          >
            {/* Icon */}
            <div className="text-2xl">{expense.icon}</div>

            {/* Category & Date */}
            <div className="flex flex-col ml-3 flex-1">
              <p className="text-sm font-medium text-primary">
                {expense.category}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <p className="text-sm font-semibold text-accent2 dark:text-red-400">
              €{expense.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Last5Expenses;
