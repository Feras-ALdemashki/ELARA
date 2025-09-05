import React from "react";

const Button = ({ name, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 
      text-primary bg-secondary rounded-lg 
      hover:bg-primary hover:text-secondary 
      transition-colors duration-300 cursor-pointer"
    >
      {Icon && <Icon size={18} />}
      {/* Show name only on large screens */}
      <span className="hidden lg:inline ml-2">{name}</span>
    </button>
  );
};

export default Button;
