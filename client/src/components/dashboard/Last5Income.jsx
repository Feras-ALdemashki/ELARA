import React from "react";
import { GoArrowRight, GoPlus } from "react-icons/go";
import Button from "../Button";

const Last5Income = ({ data, onClick }) => {
  const last5 = data?.income?.last5 ?? [];

  return (
    <div className=" p-6 w-full  flex flex-col">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-accent">Incomes</h2>
        <div className="flex gap-2">
          <Button name="See All" icon={GoArrowRight} onClick={() => {}} />
          <Button name="Add Income" icon={GoPlus} onClick={onClick} />
        </div>
      </div>

      {/* Income List */}
      <div className="space-y-3 flex-1">
        {last5.length > 0 ? (
          last5.map((income) => (
            <div
              key={income._id}
              className="flex items-center justify-between border-b border-gray-200 p-2 last:border-none"
            >
              {/* Icon */}
              <div className="text-2xl">{income.emoji || "💰"}</div>

              {/* Category & Date */}
              <div className="flex flex-col ml-3 flex-1">
                <p className="text-sm font-medium text-primary">
                  {income.category}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(income.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <p className="text-sm font-semibold text-accent">
                €{income.amount}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 mb-4 text-center">
              Start by adding your first income!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Last5Income;
