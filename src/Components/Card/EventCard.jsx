import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-green-100">
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <h3 className="text-lg font-bold truncate">{event.title}</h3>
        <FaCalendarAlt className="opacity-80 text-lg" />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <p className="text-gray-700 text-sm leading-relaxed">{event.description?.slice(0, 100)}...</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 sm:mt-0">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-4 mt-auto">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium shadow-md transition-all duration-300">Join Event</button>
      </div>
    </div>
  );
};

export default EventCard;
