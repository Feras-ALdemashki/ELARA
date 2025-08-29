import React from "react";

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-between w-64">
      {/* Top section: title + icon */}
      <div className="flex items-center justify-between">
        {title && (
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
        )}
        {icon && <div className="text-primary text-2xl">{icon}</div>}
      </div>

      {/* Main Value */}
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
        €{value}
      </p>
    </div>
  );
};

export default Card;
