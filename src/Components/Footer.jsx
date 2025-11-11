import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-green-800 text-white pt-8 pb-4">
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center md:text-left">
                    <h2 className="font-bold text-xl text-green-300">EcoTrack</h2>
                    <p className="mt-2 text-gray-200">© 2025 EcoTrack</p>
                </div>
                <div className="text-center">
                    <h3 className="font-semibold mb-2 text-green-300">Quick Links</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link to="#" className="hover:text-green-200 transition">About</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-green-200 transition">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="text-center md:text-right">
                    <h3 className="font-semibold mb-2 text-green-300">Follow Us</h3>
                    <div className="flex justify-center md:justify-end space-x-4">
                        <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition"><FaFacebookF /></a>
                        <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition"><FaTwitter /></a>
                        <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <p className="text-center text-gray-300 text-sm mt-6">Accessibility & Privacy Note</p>
        </footer>
    );
};

export default Footer;
