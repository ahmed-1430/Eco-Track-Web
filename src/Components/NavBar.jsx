import React, { useState } from "react";
import { Link } from "react-router";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import EcoTrackLogo from "../assets/Eco_Track_logo.webp";

const NavBar = ({ user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white/20 backdrop-blur-md shadow-md">
      <div className="w-11/12 mx-auto flex justify-between items-center py-3">
        <div className="flex items-center space-x-2">
          <img src={EcoTrackLogo} alt="EcoTrack Logo" className="w-10 h-10" />
          <span className="font-bold text-xl text-green-600">EcoTrack</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-green-600 font-medium">
          <Link to="/">Home</Link>
          <Link to="/challenges">Challenges</Link>
          {user && <Link to="/my-activities">My Activities</Link>}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-1 bg-white text-green-600 rounded-lg shadow hover:bg-green-50 transition">Login</Link>
              <Link to="/register" className="px-4 py-1 border border-white bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Register</Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <FaUserCircle size={24} />
              <span>{user.name}</span>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition">Logout</button>
            </div>
          )}
        </div>
        <button className="md:hidden text-green-600 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/20 backdrop-blur-md shadow-lg w-full py-4 px-6 flex flex-col space-y-4 text-green-600 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}> Home</Link>
          <Link to="/challenges" onClick={() => setMenuOpen(false)}>Challenges</Link>
          {user && (
            <Link to="/my-activities" onClick={() => setMenuOpen(false)}> My Activities</Link>
          )}
          <hr className="border-green-400/50" />
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 bg-white text-green-600 rounded-lg shadow hover:bg-green-50 transition" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="px-4 py-2 border border-white bg-green-600 text-white rounded-lg hover:bg-green-700 transition" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <FaUserCircle size={24} />
              <span>{user.name}</span>
              <button onClick={() => { handleLogout(); setMenuOpen(false);}}className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition">Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
