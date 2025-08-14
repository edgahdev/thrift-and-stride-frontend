// src/context/ThemeContext.jsx
import React, { createContext, useEffect, useState, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light mode
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false; // fallback for browsers without localStorage
    }
  });

  // Toggle between light/dark
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Apply theme changes to the DOM & localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);

    try {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    } catch {
      console.warn("Could not save theme to localStorage.");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Custom hook to use theme in components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
