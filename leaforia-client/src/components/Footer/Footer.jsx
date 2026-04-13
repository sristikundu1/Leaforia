import React from "react";
import footerImg from "../../assets/rm191-nu-08.jpg";
import { NavLink } from "react-router";
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center text-white pt-16 pb-8 px-6 md:px-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 104, 56, 0.9), rgba(113, 131, 85, 0.9)), url(${footerImg})`,
      }}
    >
      {/* Top Section: 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-500 pb-10">
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2 font-Montserrat">
            <span>🌿</span> Leaforia
          </h2>
          <p className="text-sm leading-relaxed text-gray-200">
            Grow with us. Leaforia is the ultimate platform for plant
            enthusiasts to organize their green space and connect with their
            indoor garden.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <NavLink to="/" className="hover:text-primary transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary transition">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/plants" className="hover:text-primary transition">
                Plants
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-primary transition">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Other Pages */}
        <div>
          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider">
            Other Pages
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <NavLink to="/privacy" className="hover:text-primary transition">
                Privacy & Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" className="hover:text-primary transition">
                Terms of Use
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className="hover:text-primary transition">
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="font-bold text-lg mb-6 uppercase tracking-wider">
            Our Contact
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-300">
              <FaPhoneAlt className="text-primary" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <MdEmail className="text-primary text-xl" />
              <span>contact@leaforia.com</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <MdLocationOn className="text-primary text-2xl" />
              <span>123 Green Road, Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright & Socials */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
        <p className="text-sm text-white">
          Copyright © {new Date().getFullYear()}. All rights reserved.
        </p>

        <div className="flex gap-6 text-xl">
          <a href="#" className="hover:text-primary transition">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-primary transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-primary transition">
            <FaPinterest />
          </a>
          <a href="#" className="hover:text-primary transition">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
