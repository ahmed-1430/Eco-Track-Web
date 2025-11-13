import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white pt-10 pb-6">
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="font-bold text-xl text-green-300">EcoTrack</h2>
                    <p className="mt-2 text-gray-300 text-sm">
                        EcoTrack is a community platform where eco-conscious people join sustainability challenges, share eco-tips, browse green events, and track personal environmental impact.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-green-300 mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-gray-300">
                        <li><Link to="/" className="hover:text-green-200 transition">Home</Link></li>
                        <li><Link to="/challenges" className="hover:text-green-200 transition">Challenges</Link></li>
                        <li><Link to="/register" className="hover:text-green-200 transition">Register</Link></li>
                        <li><Link to="/#" className="hover:text-green-200 transition">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-green-300 mb-2">Follow Us</h3>
                    <div className="flex space-x-3">
                        <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition"><FaFacebookF /></a>
                        <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition"><FaTwitter /></a>
                        <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition"><FaInstagram /></a>
                        <a href="#" className="p-2 bg-green-700 rounded-full hover:bg-green-600 transition"><FaLinkedinIn /></a>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-green-300 mb-2">Contact Us</h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                        <li className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Green Street, Dhaka, Bangladesh</li>
                        <li className="flex items-center gap-2"><FaPhoneAlt /> +880 1234 567890</li>
                        <li className="flex items-center gap-2"><FaEnvelope /> info@ecotrack.com</li>
                    </ul>
                </div>
            </div>
            <div className="w-11/12 mx-auto mt-8 border-t border-green-700 pt-4 text-center text-gray-400 text-sm">
                <p>© 2025 EcoTrack. All rights reserved.</p>
                <p>Committed to accessibility and privacy. Your data is secure and not shared with third parties.</p>
            </div>
        </footer>
    );
};

export default Footer;
