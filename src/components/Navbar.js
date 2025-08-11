import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut, LogIn, Search, UserCog, Home, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext'; // ✅ Import ThemeContext

const Navbar = ({ onSearch }) => {
  const { cart } = useCart();
  const { darkMode, toggleTheme } = useContext(ThemeContext); // ✅ Access theme
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      navigate('/');
      setSearchTerm('');
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-between bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="/WhatsApp Image 2025-08-02 at 7.51.14 PM.jpeg"
          alt="Logo"
          className="h-17 w-12 rd-50%"
        />
        <span className="text-xl font-bold">Thrift & Stride Store</span>
      </Link>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mx-4">
        <input
          type="text"
          placeholder="Search product by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1 rounded-l text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 px-3 py-1 rounded-r hover:bg-green-700"
        >
          <Search size={20} />
        </button>
      </form>

      {/* Right Menu */}
      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        <Link to="/" className="hover:text-green-500 flex items-center gap-1">
          <Home size={18} /> Home
        </Link>

        <Link to="/cart" className="hover:text-green-500 flex items-center gap-1">
          <ShoppingCart size={18} /> ({cart.length})
        </Link>

        {isAdmin && (
          <Link to="/admin" className="hover:text-green-500 flex items-center gap-1">
            <UserCog size={18} /> Admin
          </Link>
        )}

        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-600 px-2 py-1 rounded hover:bg-red-700"
          >
            <LogOut size={18} /> Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-green-500 flex items-center gap-1">
            <LogIn size={18} /> Login
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
