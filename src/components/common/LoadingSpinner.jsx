// components/common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  // Size classes
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-8 w-8 border-4',
    large: 'h-12 w-12 border-4'
  };

  // Color classes
  const colorClasses = {
    primary: 'border-t-primary border-r-primary border-b-transparent border-l-transparent',
    white: 'border-t-white border-r-white border-b-transparent border-l-transparent',
    black: 'border-t-black border-r-black border-b-transparent border-l-transparent',
    gray: 'border-t-gray-500 border-r-gray-500 border-b-transparent border-l-transparent'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;