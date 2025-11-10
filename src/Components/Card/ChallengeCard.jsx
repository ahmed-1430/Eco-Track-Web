import React from "react";
import { Link } from "react-router";
import { FaUsers, FaLeaf } from "react-icons/fa";

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative">
        <img src={challenge.imageUrl} alt={challenge.title} className="w-full h-48 object-fill group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">{challenge.category}</span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold text-green-800 mb-2 group-hover:text-green-600 transition-colors">{challenge.title}</h3>
        <p className="text-gray-600 text-sm flex-1">{challenge.description?.slice(0, 100)}...</p>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <FaUsers className="text-green-500" />
            <span>{challenge.participants || 0} joined</span>
          </div>
          <div className="flex items-center gap-1">
            <FaLeaf className="text-lime-600" />
            <span>Eco Impact</span>
          </div>
        </div>
        <Link to={`/challenges/${challenge._id}`} className="mt-5 inline-block text-center bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md">View Challenge</Link>
      </div>
    </div>
  );
};

export default ChallengeCard;
