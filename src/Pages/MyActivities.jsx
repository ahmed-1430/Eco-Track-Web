import React, { useEffect, useState } from "react";
import { useAuth } from "../Provider/AuthContext";
import { useNavigate, Link } from "react-router";
import Spinner from "../Components/Spinner";
import ProgressBar from "../Components/ProgressBar";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheckCircle, FaLeaf, FaClock } from "react-icons/fa";

const MyActivities = ()=> {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
      return;
    }

    const loadChallenges = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/user-challenges/user/${user.email}`);
        setJoinedChallenges(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your activities.");
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, [user?.email, navigate, API_BASE]);

  const handleProgressUpdate = async (challengeId, currentProgress) => {
    try {
      const newProgress = Math.min(currentProgress + 10, 100);
      const status = newProgress >= 100 ? "Finished" : "Ongoing";

      await axios.patch(`${API_BASE}/api/user-challenges/${challengeId}`, {
        progress: newProgress,
        status,
      });

      toast.success("Progress updated!");
      setJoinedChallenges((prev) =>
        prev.map((c) =>
          c._id === challengeId ? { ...c, progress: newProgress, status } : c
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update progress.");
    }
  };

  if (loading) return <Spinner />;

  if (joinedChallenges.length === 0)
    return (
      <div className="text-center mt-24">
        <p className="text-gray-600 mb-3 text-lg">You haven’t joined any challenges yet.</p>
        <Link to="/challenges" className="text-green-600 font-medium hover:underline">Explore challenges</Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-white to-green-50 pt-24 pb-16">
      <div className="w-11/12 mx-auto">
        <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center flex items-center justify-center gap-2"><FaLeaf className="text-green-600" /> My Activities</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {joinedChallenges.map((challenge) => (
            <div  key={challenge._id} className="relative bg-white/80 backdrop-blur-xl border border-green-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative group">
                {challenge.challenge?.imageUrl ? (
                  <img src={challenge.challenge.imageUrl} alt={challenge.challenge.title} className="w-full h-52 object-fill transform group-hover:scale-105 transition-transform duration-700"/>
                ) : (
                  <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 text-green-700 font-semibold text-sm px-3 py-1 rounded-full shadow-sm">
                    {challenge.challenge?.category || "General"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {challenge.challenge?.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {challenge.challenge?.description}
                </p>
                <div className="flex items-center gap-2 text-sm mb-3 text-gray-700">
                  {challenge.status === "Finished" ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaClock className="text-yellow-500" />
                  )}
                  <span className="font-medium">
                    {challenge.status === "Finished"
                      ? "Completed"
                      : challenge.status || "Ongoing"}
                  </span>
                </div>
                <ProgressBar progress={challenge.progress || 0} />
                <button onClick={() => handleProgressUpdate(challenge._id, challenge.progress)} disabled={challenge.progress >= 100} className={`mt-4 w-full px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${challenge.progress >= 100 ? "bg-green-900 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 hover:scale-[1.02]"}`}>
                  {challenge.progress >= 100 ? "Completed" : "+10% Progress"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MyActivities;