import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-green-700 text-white p-6 mt-12">
    <div className="w-11/12 mx-auto flex justify-between items-center flex-col md:flex-row">
      <p>© 2025 EcoTrack</p>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaInstagram /></a>
      </div>
    </div>
    <p className="text-sm text-gray-200 mt-2 text-center">Accessibility & Privacy Note</p>
  </footer>
);

export default Footer;
