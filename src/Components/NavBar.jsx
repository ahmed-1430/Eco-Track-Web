import React, { useState } from "react";
import { Link } from "react-router";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import EcoTrackLogo from "../assets/Eco_Track_logo.webp";
import { useAuth } from "../Provider/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully", { position: "top-right" });
    } catch (err){
      toast.error(`Failed to log out. Error: ${err}`);
    } finally {
      setDropdownOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <nav className="w-11/12 mx-auto flex justify-between items-center py-3">
        <Link to="/" className="flex items-center space-x-2">
          <img src={EcoTrackLogo} alt="EcoTrack Logo" className="w-10 h-10" />
          <span className="font-bold text-2xl text-green-700">EcoTrack</span>
        </Link>
        <div className="hidden md:flex space-x-6 font-medium text-green-700">
          <Link to="/">Home</Link>
          <Link to="/challenges">Challenges</Link>
          {user && <Link to="/challenges/add">Add Challenge</Link>}
          {user && <Link to="/my-activities">My Activities</Link>}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition">Login</Link>
              <Link to="/register" className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Register</Link>
            </>
          ) : (
            <div className="relative flex items-center space-x-3">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center focus:outline-none">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-9 h-9 rounded-full border border-green-600 hover:scale-105 transition-transform"/>
                ) : (
                  <FaUserCircle size={30} className="text-green-700" />
                )}
              </button>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm">Logout</button>
              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border w-48 py-2 animate-fade-in">
                  <div className="px-4 pb-2 border-b border-gray-100">
                    <p className="font-semibold text-green-700 text-sm truncate">{user.displayName || user.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-green-50"> Profile</Link>
                  <Link to="/my-activities" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-green-50">My Activities</Link>
                </div>
              )}
            </div>
          )}
        </div>
        <button className="md:hidden text-green-700 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col p-4 space-y-3 text-green-700 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/challenges" onClick={() => setMenuOpen(false)}>Challenges</Link>
            {user && (
              <>
                <Link to="/add-challenge" onClick={() => setMenuOpen(false)}>Add Challenge</Link>
                <Link to="/my-activities" onClick={() => setMenuOpen(false)}>My Activities</Link>
              </>
            )}
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-green-600 text-white px-4 py-2 rounded text-center">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="border border-green-600 px-4 py-2 rounded text-center">Register</Link>
              </>
            ) : (
              <>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-2 text-sm">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-green-600"/>
                  ) : (
                    <FaUserCircle size={22} className="text-green-700" />
                  )}
                  <span>{user.displayName || user.email}</span>
                </div>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm">Profile</Link>
                <button onClick={handleLogout} className="text-red-600 text-left text-sm">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
