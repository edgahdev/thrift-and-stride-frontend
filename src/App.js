// App.js
import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Home from './pages/Home'; // updated home page with search + categories
import Products from './pages/Products'; // optional if different from Home
import Footer from './components/Footer';
import { ThemeContext } from './context/ThemeContext'; // ✅ Import context

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = localStorage.getItem('isAdmin');
  const { darkMode } = useContext(ThemeContext); // ✅ Get darkMode

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <Navbar onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
