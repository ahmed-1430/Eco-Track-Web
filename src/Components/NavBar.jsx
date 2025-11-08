import React, { useState } from 'react';
import EcoTrackLogo from '../assets/Eco_Track_logo.webp';
import { Link } from 'react-router';

const AvatarMenu = ({ user, handleLogout }) => (
  <div className="dropdown dropdown-end dropdown-hover z-50">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar cursor-pointer">
      <div className="w-10 rounded-full">
        <img src={user.avatar} alt="User Avatar" />
      </div>
    </label>

    <ul
      tabIndex={0}
      className="menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li><a>Profile</a></li>
      <li><a>My Activities</a></li>
      <li>
        <button onClick={handleLogout} className="w-full text-left">
          Logout
        </button>
      </li>
    </ul>
  </div>
);

const NavBar = () => {
  const [user, setUser] = useState(null);

  const handleLogin = () => setUser({ name: "Alex", avatar: "https://i.ibb.co/xK8WVtXF/avatar-Demo.jpg" }); /* just for test parpous onlyy */
  const handleLogout = () => setUser(null);

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Home</a></li>
              <li><a>Challenges</a></li>
              <li><a>My Activities</a></li>
              {!user ? (
                <>
                  <li><button onClick={handleLogin}>Login</button></li>
                  <li><button>Register</button></li>
                </>
              ) : (
                <>
                  <li><a>Profile</a></li>
                  <li><a>My Activities</a></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>
          <Link to={'/'} className="text-xl flex items-center gap-2 cursor-pointer">
            <img src={EcoTrackLogo} alt="EcoTrack Logo" className="h-10 w-10" /> EcoTrack</Link>
          <div className="ml-10 hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a>Home</a></li>
              <li><a>Challenges</a></li>
              <li><a>My Activities</a></li>
            </ul>
          </div>
        </div>

        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <AvatarMenu user={user} handleLogout={handleLogout} />
          ) : (
            <>
              <button className="btn btn-outline" onClick={handleLogin}>Login</button>
              <button className="btn btn-primary">Register</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
