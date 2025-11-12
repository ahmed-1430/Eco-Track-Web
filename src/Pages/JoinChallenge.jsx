import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import { useAuth } from "../Provider/AuthContext";

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
            <div className="text-center mt-20 text-gray-600 font-medium"> Challenge not found.</div>
        );

    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white pt-24 pb-16">
            <div className="w-11/12 md:w-3/4 mx-auto">
                <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Join the Challenge</h1>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{challenge.title}</h2>
                        <p className="text-gray-600 mb-4"> Category:{" "}
                            <span className="font-semibold text-green-600">{challenge.category}</span>
                        </p>
                        <p className="text-gray-700 leading-relaxed">{challenge.description}           </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                        <p className="font-semibold text-green-800 mb-2"> Duration: {challenge.duration} days</p>
                        <p className="text-gray-700"> Starts on:{" "} {challenge.startDate ? new Date(challenge.startDate).toLocaleDateString() : "N/A"}</p>
                        <p className="text-gray-700"> Ends on:{" "} {challenge.endDate ? new Date(challenge.endDate).toLocaleDateString() : "N/A"}</p>
                    </div>
                    <button onClick={handleJoin} disabled={joining || alreadyJoined} className={`w-full md:w-auto px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${alreadyJoined ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}> {joining ? "Joining..." : alreadyJoined ? "Already Joined" : "Join Challenge Now"}</button>
                </div>
            </div>
        </div>
    );
};

export default JoinChallenge;