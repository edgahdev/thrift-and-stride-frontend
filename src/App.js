// App.js
import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import ProfilePage from './pages/ProfilePage';
import TrackOrder from './pages/TrackOrder';
import Footer from './components/Footer';
import { ThemeContext } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import SignupLogin from "./pages/SignupLogin";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <Navbar onSearch={setSearchTerm} />

      {/* Main content fills remaining space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to="/login" replace />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/signup-login" element={<SignupLogin />} />
          <Route path="/track-order" element={<TrackOrder />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
