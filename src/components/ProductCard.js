import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 font-bold">{product.name}</h3>
      <p>Ksh {product.price}</p>
      <button className="bg-black text-white px-4 py-1 mt-2 rounded">Add to Cart</button>
    </div>
  );
}
