import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import axios from "axios";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, category, description } = formData;
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    if (!title || !category || !description) {
      toast.error("Title, category, and description are required!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${baseURL}/api/challenges`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
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
      } else {
        toast.error(response.data.message || "Error creating challenge");
      }
    } catch (err) {
      console.error("Create Challenge Error:", err.response || err);
      toast.error(err.response?.data?.message || "Error creating challenge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 pt-30">
      <div className="w-11/12 mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-green-100 transition-transform hover:scale-[1.01]">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">Add a New Challenge</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input type="text" name="title" placeholder="Enter challenge title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition-all bg-white">
              <option value="">Select Category</option>
              <option value="Waste Reduction">Waste Reduction</option>
              <option value="Energy Saving">Energy Saving</option>
              <option value="Water Conservation">Water Conservation</option>
              <option value="Sustainable Transport">Sustainable Transport</option>
              <option value="Green Living">Green Living</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea name="description" placeholder="Describe your challenge..." value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition-all"/>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Duration (days)</label>
              <input type="number" name="duration" placeholder="e.g. 30" value={formData.duration} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition-all"/>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Target</label>
              <input type="text" name="target" placeholder="e.g. Plant 100 trees" value={formData.target} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition-all"/>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition-all"/>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition-all"/>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input type="text" name="imageUrl" placeholder="Paste an image link" value={formData.imageUrl} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-green-200 outline-none transition-all"/>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">{loading ? <Spinner /> : "Add Challenge "}</button>
        </form>
      </div>
    </div>
  );
};

export default AddChallenge;
