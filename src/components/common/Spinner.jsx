// components/common/Spinner.jsx
import React from "react";

const Spinner = ({ size = "md", color = "primary" }) => {
  // Size classes
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  // Color classes
  const colorClasses = {
    primary: "border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent",
    white: "border-t-white border-r-white border-b-white border-l-transparent",
    gray: "border-t-gray-500 border-r-gray-500 border-b-gray-500 border-l-transparent",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{ animation: "spin 1s linear infinite" }}
      ></div>
    </div>
  );
};

export default Spinner;