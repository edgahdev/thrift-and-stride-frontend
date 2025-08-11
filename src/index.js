import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext'; // ✅ Import ThemeProvider
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider> {/* ✅ Wrap with ThemeProvider */}
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </BrowserRouter>
);
