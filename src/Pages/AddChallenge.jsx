import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

const AddChallenge = () => {

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        duration: "",
        target: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
    });
    const [loading, setLoading] = useState(false);

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, category, description, duration, target, startDate, endDate, imageUrl } = formData;
        if (!title || !category || !description || !duration || !target || !startDate || !endDate || !imageUrl) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${baseURL}/api/challenges`, formData, { withCredentials: true });
            toast.success(" Challenge created successfully!");
            setFormData({
                title: "",
                category: "",
                description: "",
                duration: "",
                target: "",
                startDate: "",
                endDate: "",
                imageUrl: "",
            });
        } catch (err) {
            console.error("Error creating challenge:", err);
            toast.error(err.response?.data?.message || "Error creating challenge");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-20 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
                <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Add New Challenge</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" name="title" placeholder="Challenge Title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none">
                        <option value="">Select Category</option>
                        <option value="Waste Reduction">Waste Reduction</option>
                        <option value="Energy Saving">Energy Saving</option>
                        <option value="Water Conservation">Water Conservation</option>
                        <option value="Sustainable Transport">Sustainable Transport</option>
                        <option value="Green Living">Green Living</option>
                    </select>
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
                    <input type="number" name="duration" placeholder="Duration (days)" value={formData.duration} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
                    <input type="text" name="target" placeholder="Target (e.g. 100 trees planted)" value={formData.target} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
                    </div>
                    <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" />
                    <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 flex items-center justify-center">{loading ? <Spinner /> : "Add Challenge"}</button>
                </form>
            </div>
        </div>
    );
};

export default AddChallenge;
