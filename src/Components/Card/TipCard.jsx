import React from "react";
import { FaThumbsUp, FaUser } from "react-icons/fa";

const TipCard = ({ tip }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-green-100 p-5 flex flex-col">
      <h3 className="text-lg font-bold text-green-800 group-hover:text-green-600 transition-colors">{tip.title}</h3>
      <p className="text-gray-600 text-sm mt-2 leading-relaxed flex-1">{tip.content?.slice(0, 100)}...</p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaUser className="text-green-500" />
          <span>{tip.authorName || "Unknown"}</span>   {/* if not find author name if not available author name in database then showing "Unknown" */}
        </div>
        <div className="flex items-center gap-1 text-green-700 font-medium">
          <FaThumbsUp className="text-green-600" />
          <span>{tip.upvotes || 0}</span>   {/* if upvotes null or any others error then showing by default "0" */}
        </div>
      </div>
    </div>
  );
};

export default TipCard;
