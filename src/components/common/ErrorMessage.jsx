import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({
  title = 'Oops! Something went wrong',
  message = 'An unexpected error occurred. Please try again later.',
  variant = 'error',
  className = '',
  onRetry,
  retryText = 'Retry',
  icon: Icon = AlertTriangle
}) => {
  const variantStyles = {
    error: 'bg-red-50 text-red-800 border border-red-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
    success: 'bg-green-50 text-green-800 border border-green-200'
  };

  const iconColors = {
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
    success: 'text-green-500'
  };

  return (
    <div
      className={`w-full max-w-md mx-auto rounded-xl p-5 flex items-start gap-4 shadow-sm ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <div className="pt-1">
        <Icon className={`w-5 h-5 ${iconColors[variant]}`} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-amber-800 font-semibold">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className={`mt-3 inline-block px-4 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
              variant === 'error'
                ? 'bg-red-100 hover:bg-red-200 text-red-800'
                : variant === 'warning'
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                : variant === 'info'
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                : 'bg-green-100 hover:bg-green-200 text-green-800'
            }`}
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
