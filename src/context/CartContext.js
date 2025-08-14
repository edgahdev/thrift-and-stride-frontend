import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  const removeFromCart = (_id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item._id === _id && item.size === size))
    );
  };

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
