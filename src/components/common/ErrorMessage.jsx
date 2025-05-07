import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({
  title = 'Oops! Something went wrong',
  message = 'An unexpected error occurred. Please try again later.',
  variant = 'error',
  className = '',
  onRetry,
  retryText = 'Retry'
}) => {
  const variantStyles = {
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200'
  };

  const iconColors = {
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
    success: 'text-green-500'
  };

  return (
    <div
      className={`rounded-lg border p-4 ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className={`mt-0.5 flex-shrink-0 ${iconColors[variant]}`} />
        <div className="flex-1">
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className={`mt-3 inline-block px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                variant === 'error'
                  ? 'bg-red-100 hover:bg-red-200'
                  : variant === 'warning'
                  ? 'bg-amber-100 hover:bg-amber-200'
                  : variant === 'info'
                  ? 'bg-blue-100 hover:bg-blue-200'
                  : 'bg-green-100 hover:bg-green-200'
              }`}
            >
              {retryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
