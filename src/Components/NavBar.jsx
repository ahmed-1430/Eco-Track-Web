import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import EcoTrackLogo from "../assets/Eco_Track_logo.webp";
import { useAuth } from "../Provider/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully", { position: "top-right" });
    } catch (err) {
      toast.error(`Failed to log out. Error: ${err}`);
    } finally {
      setDropdownOpen(false);
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" },
    ...(user ? [{ name: "Add Challenge", path: "/challenges/add" }] : []),
    ...(user ? [{ name: "My Activities", path: "/my-activities" }] : []),
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/20 backdrop-blur-sm shadow-md z-50">
      <nav className="w-11/12 mx-auto flex items-center py-3">
        <Link to="/" className="flex items-center space-x-2">
          <img src={EcoTrackLogo} alt="EcoTrack Logo" className="w-10 h-10" />
          <span className="font-bold text-2xl text-green-700">EcoTrack</span>
        </Link>
        <div className="hidden md:flex items-center ml-auto space-x-6 font-medium text-green-700">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} className={`hover:text-green-600 transition ${location.pathname === item.path
              ? "text-green-700 border-b-2 border-green-600 pb-1"
              : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="ml-3 flex items-center focus:outline-none cursor-pointer">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-11 h-11 rounded-full border border-green-600 hover:scale-105 transition-transform" />
                ) : (
                  <FaUserCircle size={33} className="text-green-700" />
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 animate-fade-in">
                  <div className="px-4 pb-2 border-b border-gray-100">
                    <p className="font-semibold text-green-700 truncate">
                      {user.displayName || user.email}
                    </p>
                  </div>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-green-50">Profile</Link>
                  <Link to="/my-activities" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-green-50">My Activities</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition cursor-pointer">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition">Login</Link>
              <Link to="/register" className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Register</Link>
            </>
          )}
        </div>
        <button className="md:hidden text-green-700 text-2xl ml-auto" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col p-4 space-y-3 text-green-700 font-medium">
            {menuItems.map((item) => (
              <Link key={item.name} to={item.path} onClick={() => setMenuOpen(false)} className={`hover:text-green-600 transition ${location.pathname === item.path ? "font-bold text-green-700" : ""}`}>{item.name}</Link>
            ))}

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
                    <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-green-600" />
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
