import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 flex items-center gap-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 text-white text-2xl shadow-md">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-green-800 leading-tight">{value}</p>
        <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
