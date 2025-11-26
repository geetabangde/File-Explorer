import React from "react";
import { X } from "lucide-react";

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;
  return (
    <>
      <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <X className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700 font-medium">{message}</p>
          </div>
          <button
            onClick={onDismiss}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;
