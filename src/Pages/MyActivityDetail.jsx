import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "../Provider/AuthContext";
import axios from "axios";
import Spinner from "../Components/Spinner";
import ProgressBar from "../Components/ProgressBar";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaLeaf,
  FaEdit,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MyActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
      return;
    }

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE}/api/user-challenges/user/${user.email}`
        );
        const data = res.data.data;
        const found = data.find((a) => a._id === id);
        if (!found) {
          toast.error("Activity not found");
          navigate("/my-activities");
          return;
        }
        setActivity(found);
        setStatus(found.status);
        setNewStatus(found.status);
        setProgress(found.progress || 0);

        const timeline = [];
        const baseDate = new Date(found.joinDate || Date.now());
        for (let i = 0; i <= (found.progress || 0); i += 20) {
          const date = new Date(baseDate.getTime() + (i * 86400000) / 10);
          timeline.push({
            date: date.toLocaleDateString(),
            progress: i,
          });
        }
        setHistory(timeline);
      } catch (err) {
        // console.error(err);
        toast.error(`Failed to load activity details. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id, user?.email, navigate, API_BASE]);

  const handleProgress = async (type) => {
    if (!activity) return;
    try {
      const change = type === "increase" ? 10 : -10;
      const newProgress = Math.min(Math.max(progress + change, 0), 100);
      const newStatus = newProgress >= 100 ? "Finished" : status;

      await axios.patch(`${API_BASE}/api/user-challenges/${activity._id}`, {
        progress: newProgress,
        status: newStatus,
      });

      setProgress(newProgress);
      setStatus(newStatus);
      toast.success("Progress updated!");

      setHistory((prev) => [
        ...prev,
        { date: new Date().toLocaleDateString(), progress: newProgress },
      ]);
    } catch (error) {
      // console.error(error);
      toast.error(`Failed to update progress. ${error}`);
    }
  };

  const handleStatusChange = async () => {
    if (!activity) return;
    try {
      await axios.patch(`${API_BASE}/api/user-challenges/${activity._id}`, {
        status: newStatus,
      });
      setStatus(newStatus);
      toast.success(`Status changed to "${newStatus}"`);
    } catch (error) {
      // console.error(error);
      toast.error(`Failed to update status. ${error}`);
    }
  };

  if (loading) return <Spinner />;
  if (!activity) return null;

  const { challenge } = activity;

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-white to-green-50 pt-20 pb-16">
      <div className="w-11/12 mx-auto ">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-green-700 hover:text-green-900 font-medium cursor-pointer"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
          <div className="relative">
            <img
              src={challenge?.imageUrl || "/default.jpg"}
              alt={challenge?.title}
              className="w-full h-72 object-fill"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <h1 className="absolute bottom-6 left-8 text-3xl md:text-4xl font-extrabold text-white flex items-center gap-2">
              <FaLeaf className="text-green-300" /> {challenge?.title}
            </h1>
          </div>

          <div className="p-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-green-800 mb-3">Challenge Overview</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{challenge?.description}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">{challenge?.category}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"> Duration: {challenge?.duration || "N/A"}</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold"> Target: {challenge?.target || "N/A"}</span>
              </div>
              <ProgressBar progress={progress} />
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button  onClick={() => handleProgress("increase")}  disabled={progress >= 100} className={`px-5 py-2 rounded-lg text-white font-semibold transition-all duration-300 cursor-pointer ${ progress >= 100 ? "bg-green-900 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 hover:scale-[1.03]"}`}> {progress >= 100 ? "Completed" : "+10% Progress"}</button>

                <button onClick={() => handleProgress("decrease")}  disabled={progress <= 0} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-300 cursor-pointer">-10% Progress</button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <FaEdit className="text-green-600" />
                  <select  value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
                    <option value="Not Started">Not Started</option>
                    <option value="active">Active</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Finished">Finished</option>
                  </select>
                </div>
                <button
                  onClick={handleStatusChange}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition-all duration-300 cursor-pointer"
                >
                  Update Status
                </button>
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100 shadow-inner">
              <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2"> <FaChartLine /> Progress Trend</h3>
              <div className="h-48 mb-5">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history}>
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="#16a34a"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2"><FaClock /> Activity Timeline</h3>
              <ul className="text-sm text-gray-700 space-y-2 max-h-40 overflow-y-auto pr-1">
                {history.map((item, i) => (
                  <li key={i} className="flex justify-between bg-white/70 px-3 py-2 rounded-lg border border-green-100">
                    <span>{item.date}</span>
                    <span className="font-semibold">{item.progress}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="px-8 pb-8">
            <Link to="/my-activities" className="text-green-700 hover:underline font-medium flex items-center gap-1 mt-4"><FaArrowLeft /> Back to My Activities</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivityDetail;
