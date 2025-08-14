import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">Thrift & Stride</h2>
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-black">S</span>tyle{" "}
            <span className="font-bold text-black">D</span>oesn't{" "}
            <span className="font-bold text-black">H</span>ave{" "}
            <span className="font-bold text-black">T</span>o{" "}
            <span className="font-bold text-black">C</span>ost{" "}
            <span className="font-bold text-black">A</span>{" "}
            <span className="font-bold text-black">F</span>ortune.<br />
            <span className="font-bold text-black">T</span>hrift &{" "}
            <span className="font-bold text-black">S</span>tride{" "}
            <span className="font-bold text-black">G</span>ot{" "}
            <span className="font-bold text-black">Y</span>our{" "}
            <span className="font-bold text-black">L</span>ook.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">Products</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline">Cart</Link>
            </li>
            <li>
              <Link to="/signup-login" className="hover:underline">Signup / Login</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/254794926847"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaWhatsapp />
            </a>
          </div>
          <p className="text-sm mt-2">Email: info@thriftstride.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-900 text-center py-3 text-xs">
        &copy; {new Date().getFullYear()} Thrift & Stride Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
