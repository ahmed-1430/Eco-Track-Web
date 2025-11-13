import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useAuth } from "../Provider/AuthContext";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";
import {
  FaLeaf,
  FaChartLine,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaRunning,
  FaArrowRight,
} from "react-icons/fa";

const MyActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!user?.email) return;
    const fetchActivities = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/user-challenges/user/${user.email}`);
        setActivities(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your challenges.");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [user?.email, API_BASE]);

  if (loading) return <Spinner />;

  const filtered =
    filter === "All" ? activities : activities.filter((a) => a.status === filter);

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-white to-green-50 pt-24 pb-16">
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 flex items-center gap-2"><FaLeaf className="text-green-600" /> My Activities</h1>
            <p className="text-gray-600 mt-2">Track your ongoing and completed environmental challenges. </p>
          </div>

          <div className="mt-4 md:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold text-green-700 bg-white shadow-sm"
            >
              <option value="All">All</option>
              <option value="active">active</option>
              <option value="Not Started">Not Started</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FaRunning className="text-5xl mx-auto mb-3 text-green-400" />
            <p className="text-lg font-medium">You haven’t joined any challenges yet!</p>
            <Link to="/challenges" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300">Explore Challenges</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((activity) => {
              const { challenge } = activity;

              return (
                <Link to={`/my-activities/${activity._id}`} key={activity._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={challenge?.imageUrl || "/default.jpg"} // to avoid error 
                      alt={challenge?.title}
                      className="w-full h-70 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{challenge?.title}</h3>
                      <p className="text-sm text-gray-200">{challenge?.category}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                        <FaCalendarAlt className="text-green-500" />{" "}
                        {challenge?.duration || "N/A"} days
                      </span>
                      <span className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                        <FaChartLine className="text-blue-500" /> {challenge?.impactMetric || "Impact"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${activity.status === "Ongoing"
                            ? "bg-yellow-100 text-yellow-700"
                            : activity.status === "Finished"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {activity.status}
                      </span>

                      <div className="flex items-center text-green-600 font-semibold text-sm gap-1 group-hover:gap-2 transition-all duration-300">
                        View Details <FaArrowRight className="text-green-700" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivities;
