// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add product with quantity and size
  const addToCart = (product) => {
    const { _id, size } = product;

    setCart((prev) => {
      // Check if product with same id and size exists
      const existingIndex = prev.findIndex(
        (item) => item._id === _id && item.size === size
      );

      if (existingIndex !== -1) {
        // Update quantity if already in cart
        const updatedCart = [...prev];
        updatedCart[existingIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        // Add new product entry
        return [...prev, product];
      }
    });
  };

  // ✅ Remove item by id + size
  const removeFromCart = (_id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item._id === _id && item.size === size))
    );
  };

  // ✅ Optional: Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
