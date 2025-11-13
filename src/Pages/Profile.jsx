import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Spinner from "../Components/Spinner";
import { useAuth } from "../Provider/AuthContext";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
console.log(user);
  const [userData, setUserData] = useState({
    name: user?.displayName || "Demo Name",
    email: user?.email || "demo@mail.com",
    photoURL: user?.photoURL || "",
    status: user?.status || "Active",
  });

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditing(false);
      toast.error("Profile save functionality not implemented yet."); 
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-b from-green-50 via-white to-green-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-green-700 text-center">
          My Profile
        </h2>

        {/* Profile Photo */}
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-green-100">
            {userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-700 font-bold text-xl">
                {userData.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-400 ${
                editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              readOnly
              className="w-full border rounded-md p-2 mt-1 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-semibold">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={userData.photoURL}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-400 ${
                editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-semibold">
              Account Status
            </label>
            <input
              type="text"
              name="status"
              value={userData.status}
              readOnly
              className="w-full border rounded-md p-2 mt-1 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end mt-6">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
              <FiEdit3 /> Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              {loading ? <Loading /> : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
