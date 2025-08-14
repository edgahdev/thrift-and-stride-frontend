import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  ShoppingCart,
  Search,
  UserCog,
  Home,
  Sun,
  Moon,
  User
} from 'lucide-react';

const Navbar = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [showTrackForm, setShowTrackForm] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const trackRef = useRef(null);

  const isAdmin = user?.isAdmin === true;

  // ✅ New fully functional search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(searchTerm.trim())}`);
      if (!res.ok) throw new Error('Failed to fetch search results');
      const data = await res.json();

      // Save results so homepage can use them
      localStorage.setItem('searchResults', JSON.stringify(data));

      // Navigate to home to display results
      navigate('/');

    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearchTerm('');
    }
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) {
        setOrderStatus({ error: 'Order not found' });
        return;
      }
      const data = await res.json();
      setOrderStatus(data);
    } catch (err) {
      console.error('Error tracking order:', err);
      setOrderStatus({ error: 'Error tracking order' });
    }
  };

  const handleUserClick = () => {
    if (user) {
      navigate('/signup-login');
    } else {
      navigate('/account');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (trackRef.current && !trackRef.current.contains(e.target)) {
        setShowTrackForm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between gap-4 p-4 shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            TS
          </div>
          <span className="font-bold text-lg">Thrift & Stride</span>
        </Link>
      </div>

      {/* User Icon */}
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={handleUserClick}
      >
        {user && user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover border"
          />
        ) : (
          <User size={28} />
        )}
        {user && <span className="hidden sm:inline">{user.name}</span>}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center w-full max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search product by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded-l border border-gray-300 dark:border-gray-700 text-sm focus:outline-none"
        />
        <button type="submit" className="bg-green-600 px-3 py-2 rounded-r text-white">
          <Search size={18} />
        </button>
      </form>

      {/* Navigation Items */}
      <div className="flex items-center gap-3">
        <Link to="/" className="hidden sm:flex items-center gap-1 hover:text-green-500">
          <Home size={16} /> Home
        </Link>

        {/* Track Order */}
        <div className="relative" ref={trackRef}>
          <button
            onClick={() => setShowTrackForm((prev) => !prev)}
            className="hover:underline"
          >
            Track Order
          </button>
          {showTrackForm && (
            <div className="absolute right-0 mt-2 p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg w-64 z-50">
              <form onSubmit={handleTrackOrder}>
                <input
                  type="text"
                  placeholder="Enter Order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-2 py-1 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Track
                </button>
              </form>
              {orderStatus && (
                <div className="mt-2 text-sm">
                  {orderStatus.error ? (
                    <p className="text-red-500">{orderStatus.error}</p>
                  ) : (
                    <>
                      <p>Status: {orderStatus.status}</p>
                      <p>Total: ${orderStatus.total}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="flex items-center gap-1 hover:text-green-500">
          <ShoppingCart size={16} /> <span className="ml-1">({cart.length})</span>
        </Link>

        {/* Admin */}
        {isAdmin && (
          <Link to="/admin" className="flex items-center gap-1 hover:text-green-500">
            <UserCog size={16} /> Admin
          </Link>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title={darkMode ? 'Switch to light' : 'Switch to dark'}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
