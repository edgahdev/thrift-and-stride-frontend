import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h2 className="font-bold text-xl">Thrift & Stride</h2>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:text-yellow-300">Home</Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-yellow-300">Products</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-yellow-300">Cart</Link>
        </li>
    
      </ul>
    </nav>
  );
}
