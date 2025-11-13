import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import { useAuth } from "../Provider/AuthContext";
import { FaClock, FaCalendarAlt, FaUsers } from "react-icons/fa";

const JoinChallenge = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [alreadyJoined, setAlreadyJoined] = useState(false);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API_BASE}/api/challenges/${id}`);
                setChallenge(res.data.data);

                if (user?.email) {
                    const joinedRes = await axios.get(
                        `${API_BASE}/api/user-challenges/user/${user.email}`
                    );
                    const joined = joinedRes.data.data.some(
                        (uc) => uc.challengeId === res.data.data._id
                    );
                    setAlreadyJoined(joined);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load challenge info.");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [id, API_BASE, user?.email]);

    const handleJoin = async () => {
        if (!user?.email) {
            toast.error("Please log in first.");
            return;
        }

        try {
            setJoining(true);
            await axios.post(`${API_BASE}/api/challenges/join/${id}`, {
                email: user.email,
            });
            toast.success("You’ve successfully joined this challenge!");
            setAlreadyJoined(true);
            navigate("/my-activities");
        } catch (err) {
            console.error(err);
            const msg =
                err.response?.data?.message || "Failed to join the challenge.";
            toast.error(msg);
            if (msg.includes("already joined")) setAlreadyJoined(true);
        } finally {
            setJoining(false);
        }
    };

    if (loading) return <Spinner />;

    if (!challenge)
        return (
            <div className="text-center mt-20 text-gray-600 font-medium">
                Challenge not found.
            </div>
        );

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 pt-24 pb-16 flex justify-center">
            <div className="w-11/12 mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10">
                    <img src={challenge.imageUrl} alt={challenge.title} className="w-full h-64 md:h-80 object-fill transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                        <h1 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-md">
                            {challenge.title}
                        </h1>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 transition-all duration-500 hover:shadow-3xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-4 text-center"> Join the Challenge </h2>
                    <p className="text-gray-600 text-center mb-8 leading-relaxed max-w-2xl mx-auto"> Ready to take action? Join <span className="font-semibold text-green-700">{challenge.title}</span> and make an impact! See the details below before joining.</p>

                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8 mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-lg font-semibold text-gray-800 mb-2">Category</p>
                                <p className="text-green-700 font-medium">{challenge.category || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaUsers /> Participants</p>
                                <p className="text-green-700 font-medium">{challenge.participants || 0}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaClock /> Duration</p>
                                <p className="text-green-700 font-medium">{challenge.duration} days</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"> <FaCalendarAlt /> Start Date</p>
                                <p className="text-green-700 font-medium">{challenge.startDate ? new Date(challenge.startDate).toLocaleDateString() : "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaCalendarAlt /> End Date</p>
                                <p className="text-green-700 font-medium">{challenge.endDate ? new Date(challenge.endDate).toLocaleDateString() : "N/A"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-10">
                        <h3 className="text-2xl font-semibold text-green-700 mb-3">About the Challenge</h3>
                        <p className="text-gray-700 leading-relaxed">{challenge.description}</p>
                    </div>
                    <div className="text-center">
                        <button onClick={handleJoin} disabled={joining || alreadyJoined} className={`w-full sm:w-auto px-10 py-4 text-lg font-bold rounded-xl shadow-md transform transition-all duration-300 cursor-pointer ${alreadyJoined ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 hover:bg-green-700 hover:scale-105 text-white"}`}>{joining ? "Joining..." : alreadyJoined ? "Already Joined" : "Join Challenge Now"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinChallenge;
