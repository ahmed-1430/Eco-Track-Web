import React from "react";

export default function ProgressBar({ progress }) {
  const percentage = Math.min(Math.max(progress || 0, 0), 100);

  const getColor = () => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    <div className="w-full mt-3">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
        <span>Progress</span>
        <span>{percentage}% {percentage >= 100 ? "(Finished)" : "(Ongoing)"}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
        <div
          className={`${getColor()} h-3 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}