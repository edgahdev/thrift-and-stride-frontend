import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import heroImage from '../assets/image.png';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate('/products');
  };

  return (
    <div
      className={`bg-cover bg-center bg-no-repeat transition-all duration-300 ${
        darkMode ? 'text-white' : 'text-green-800'
      }`}
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
      role="banner"
      aria-label="Hero Section with focus on comfort and style"
    >
      <div className="bg-black/50 py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl mb-6 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Focuses on comfort and lasting style
          </h1>
          <p className="mb-6 text-gray-200">
            Discover your unique boutique pieces today — from dresses to shoes and everything in between.
          </p>
          <div className="flex gap-4">
            <button
              onClick={goToProducts}
              aria-label="Shop now for boutique pieces"
              className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
              type="button"
            >
              Shop Now
            </button>
            <button
              onClick={goToProducts}
              aria-label="Explore trendy collections"
              className={`border px-6 py-2 rounded-full transition focus:outline-none focus:ring-4 ${
                darkMode
                  ? 'border-white text-white hover:bg-white hover:text-green-800 focus:ring-white'
                  : 'border-green-700 text-green-700 hover:bg-green-100 focus:ring-green-400'
              }`}
              type="button"
            >
              Trendy Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
