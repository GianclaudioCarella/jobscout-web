import React from 'react';
import { ScaleLoader } from "react-spinners";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Searching for jobs..." 
}) => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <ScaleLoader color="#2563eb" />
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};