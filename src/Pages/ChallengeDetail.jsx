import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import { useAuth } from "../Provider/AuthContext";

const ChallengeDetail = () => {
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
                    const userChallengesRes = await axios.get(
                        `${API_BASE}/api/user-challenges/user/${user.email}`
                    );

                    const joined = userChallengesRes.data.data.some(
                        (uc) => uc.challengeId === res.data.data._id
                    );
                    setAlreadyJoined(joined);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load challenge. Please refresh the page.");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [id, API_BASE, user?.email]);

    const handleJoin = async () => {
        if (!user?.email) {
            toast.error("Please log in to join this challenge.");
            return;
        }

        try {
            setJoining(true);

            await axios.post(`${API_BASE}/api/challenges/join/${id}`, {
                email: user.email
            });

            toast.success("You’ve successfully joined this challenge!");

            setChallenge((prev) => ({
                ...prev,
                participants: (prev.participants || 0) + 1
            }));

            setAlreadyJoined(true);
            navigate("/my-activities");
        } catch (err) {
            console.error(err);

            const message =
                err.response?.data?.message || "Unable to join the challenge.";

            toast.error(message);

            if (message.includes("already joined")) {
                setAlreadyJoined(true);
            }
        } finally {
            setJoining(false);
        }
    };

    if (loading) return <Spinner />;

    if (!challenge)
        return (
            <div className="text-center mt-20 text-gray-600 font-medium">
                Challenge not found
            </div>
        );

    const infoItems = [
        { label: "Category", value: challenge.category || "N/A" },
        { label: "Participants", value: challenge.participants || 0 },
        { label: "Impact Metric", value: challenge.impactMetric || "N/A" },
        { label: "Duration", value: `${challenge.duration || "N/A"} days` },
        {
            label: "Start Date",
            value: challenge.startDate
                ? new Date(challenge.startDate).toLocaleDateString()
                : "N/A"
        },
        {
            label: "End Date",
            value: challenge.endDate
                ? new Date(challenge.endDate).toLocaleDateString()
                : "N/A"
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white pt-24 pb-16">
            <div className="w-11/12 md:w-11/12 mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img src={challenge.imageUrl} alt={challenge.title} className="w-full h-64 md:h-96 object-cover transform hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6 md:p-10">
                        <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg">{challenge.title}</h1>
                    </div>
                </div>
                <div className="mt-10 bg-white rounded-2xl shadow-xl p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                        <div>
                            <p className="text-green-700 font-semibold uppercase text-sm">{challenge.category || "Category Not Available"}</p>
                            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">{challenge.title}</h2>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button onClick={handleJoin} disabled={joining || alreadyJoined} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50">{joining ? "Joining..." : alreadyJoined ? "Already Joined" : "Join Challenge"}</button>
                        </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">{challenge.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
                        {infoItems.map((item, index) => (
                            <div key={index} className="bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <p className="font-bold text-green-700">{item.label}</p>
                                <p className="text-black/60 font-semibold">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 text-center bg-green-100 rounded-2xl p-10 shadow-inner">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">Ready to make an impact?</h2>
                    <p className="text-gray-700 mb-6">Take a small step today — join this challenge and contribute to a sustainable future.</p>
                    <button onClick={handleJoin} disabled={joining || alreadyJoined} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50"> {joining ? "Joining..." : alreadyJoined ? "Already Joined" : "Join the Challenge Now"}</button>
                </div>
            </div>
        </div>
    );
};
export default ChallengeDetail;
