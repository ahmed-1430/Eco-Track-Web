import React from "react";
import { Link } from "react-router";
import { FaLeaf, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 p-6">
      <div className="text-center space-y-6">
        <div className="text-9xl font-extrabold text-green-600 animate-bounce">
          404
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
          The page you are looking for doesn’t exist or has been moved. But don’t worry — the environment is still thriving! 
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            <FaLeaf /> Back to Home
          </Link>
          <Link
            to="/challenges"
            className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105"
          >
            <FaArrowLeft /> Browse Challenges
          </Link>
        </div>
      </div>

      {/* Decorative leaves */}
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden pointer-events-none">
        <div className="w-16 h-16 bg-green-200 rounded-full absolute -left-10 -bottom-10 rotate-12 animate-spin-slow"></div>
        <div className="w-24 h-24 bg-green-300 rounded-full absolute -right-10 -bottom-12 rotate-45 animate-spin-slow"></div>
        <div className="w-12 h-12 bg-green-100 rounded-full absolute left-1/2 bottom-8 -translate-x-1/2 animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default NotFound;
