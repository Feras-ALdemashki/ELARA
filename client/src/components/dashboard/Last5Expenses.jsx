import React from "react";
import Button from "../Button";
import { GoArrowRight, GoPlus } from "react-icons/go";

const Last5Expenses = ({ data, onClick }) => {
  const last5 = data?.expenses?.last5 ?? [];

  return (
    <div className=" p-6  flex flex-col">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-accent2">Expenses</h2>
        <div className="flex gap-2">
          <Button name="See All" icon={GoArrowRight} onClick={() => {}} />
          <Button name="Add Expense" icon={GoPlus} onClick={onClick} />
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-3 flex-1">
        {last5.length > 0 ? (
          last5.map((expense) => (
            <div
              key={expense._id}
              className="flex items-center justify-between border-b border-gray-200 p-2 last:border-none"
            >
              {/* Icon */}
              <div className="text-2xl">{expense.emoji || "💸"}</div>

              {/* Category & Date */}
              <div className="flex flex-col ml-3 flex-1">
                <p className="text-sm font-medium text-primary">
                  {expense.category}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <p className="text-sm font-semibold text-accent2">
                €{expense.amount}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 mb-4 text-center">
              Start by adding your first expense!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Last5Expenses;
