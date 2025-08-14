// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // ✅ Add updateProfile logic
  const updateProfile = async (formData) => {
    try {
      // This would normally go to your backend API
      // Example:
      // const res = await fetch('/api/profile', { method: 'POST', body: formData });
      // const data = await res.json();
      // Simulate update success locally for now:
      const updatedUser = { ...user };
      formData.forEach((value, key) => {
        if (key === 'avatar') {
          updatedUser.avatar = URL.createObjectURL(value); // temp preview
        } else {
          updatedUser[key] = value;
        }
      });
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { ok: true };
      
    } catch (err) {
      console.error(err);
      return { ok: false, message: 'Profile update failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
