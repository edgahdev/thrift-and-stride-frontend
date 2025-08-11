import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Thrift & Stride</h2>
          <p className="text-sm">
            <span className="Text-xl font-bold text-Black mt-10">S</span>tyle <span className="Text-xl font-bold text-Black mt-10">D</span>oesn't <span className="Text-xl font-bold text-Black mt-10">H</span>ave <span className="Text-xl font-bold text-Black mt-10">T</span>o  <span className="Text-xl font-bold text-Black mt-10">C</span>ost <span className="Text-xl font-bold text-Black mt-10">A</span> <span className="Text-xl font-bold text-Black mt-10">F</span>ortune <br></br> <span className="Text-xl font-bold text-Black mt-10">T</span>hrift & <span className="Text-xl font-bold text-Black mt-10">S</span>tride <span className="Text-xl font-bold text-Black mt-10">G</span>ot <span className="Text-xl font-bold text-Black mt-10">Y</span>our <span className="Text-xl font-bold text-Black mt-10">L</span>ook.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://wa.me/254794926847" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
          <p className="text-sm mt-2">Email: info@thriftstride.com</p>
        </div>
      </div>

      <div className="bg-green-900 text-center py-3 text-xs">
        &copy; {new Date().getFullYear()} Thrift & Stride Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
