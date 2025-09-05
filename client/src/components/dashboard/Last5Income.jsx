import React from "react";
import { GoArrowRight, GoPlus } from "react-icons/go";
import Button from "../Button";
const Last5Income = ({ data, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-10 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-accent">Incomes</h2>
        <div className="flex gap-2">
          <Button name="See All" icon={GoArrowRight} onClick={() => {}} />
          <Button name="Add Expense" icon={GoPlus} onClick={onClick} />
        </div>
      </div>

      <div className="space-y-3">
        {data.income.last5.map((income) => (
          <div
            key={income._id}
            className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 last:border-none"
          >
            {/* Icon */}
            <div className="text-2xl">{income.emoji || "💰"}</div>

            {/* Source & Date */}
            <div className="flex flex-col ml-3 flex-1">
              <p className="text-sm font-medium text-primary">
                {income.category}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(income.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <p className="text-sm font-semibold text-accent">
              €{income.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Last5Income;
