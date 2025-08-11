import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="w-full max-w-xs border border-green-200 p-5 rounded-xl shadow-lg bg-green-50 hover:shadow-xl transition duration-300 mx-auto">
      {/* Product Image */}
      <div className="w-full aspect-square overflow-hidden bg-green-100 rounded-lg flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain transform hover:scale-105 transition duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 font-bold text-center text-green-900 text-lg">
        {product.title}
      </h3>

      {/* Price */}
      <p className="text-center text-green-700 font-medium">
        Ksh {product.price}
      </p>

      {/* Add to Cart Button */}
      <button
        className="block w-full mt-4 bg-green-700 text-white py-2 rounded-full hover:bg-green-800 transition duration-300"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
