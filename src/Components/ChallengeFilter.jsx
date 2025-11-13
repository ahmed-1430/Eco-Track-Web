import React from "react";
import { FaFilter, FaUsers, FaLayerGroup, FaCalendarAlt } from "react-icons/fa";

const ChallengeFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({
      category: "",
      status: "all",
      participantsMin: "",
      participantsMax: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center space-x-2">
        <FaLayerGroup className="text-green-600" />
        <select  name="category" value={filters.category} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">All Categories</option>
          <option value="Waste Reduction">Waste Reduction</option>
          <option value="Energy Saving">Energy Saving</option>
          <option value="Water Conservation">Water Conservation</option>
          <option value="Sustainable Transport">Sustainable Transport</option>
          <option value="Green Living">Green Living</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <FaCalendarAlt className="text-green-600" />
        <select name="status" value={filters.status} onChange={handleChange} className="border border-gray-300 w-fit rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <FaUsers className="text-green-600" />
        <input type="number" name="participantsMin" placeholder="Min Participants" value={filters.participantsMin} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-fit focus:outline-none focus:ring-2 focus:ring-green-500"/>
      </div>
      <div className="flex items-center space-x-2">
        <FaUsers className="text-green-600" />
        <input type="number" name="participantsMax"  placeholder="Max Participants" value={filters.participantsMax} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-fit focus:outline-none focus:ring-2 focus:ring-green-500"/>
      </div>
      <button onClick={handleReset} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"> <FaFilter /> Reset Filters</button>
    </div>
  );
};

export default ChallengeFilter;
