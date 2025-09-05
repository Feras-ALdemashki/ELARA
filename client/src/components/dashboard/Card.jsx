import React from "react";

const Card = ({ title, value, icon }) => {
  return (
    <div className="group bg-white text-primary hover:bg-primary hover:text-secondary transition-colors duration-300 shadow-md rounded-lg p-6 flex flex-col justify-between w-64 border-primary border-1">
      {/* Top section: title + icon */}
      <div className="flex items-center justify-between">
        {title && (
          <h3 className="text-sm font-medium text-primary group-hover:text-white">
            {title}
          </h3>
        )}
        {icon && (
          <div className="text-primary text-2xl group-hover:text-white">
            {icon}
          </div>
        )}
      </div>

      {/* Main Value */}
      <p className="text-3xl font-bold text-primary group-hover:text-white">
        €{value}
      </p>
    </div>
  );
};

export default Card;
