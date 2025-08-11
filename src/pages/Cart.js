import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  // Total calculated based on quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{' '}
          <Link to="/" className="text-green-600 hover:underline">
            Browse products
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={`${item._id}-${item.size}-${index}`}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border p-4 rounded-md shadow-md bg-white"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-600 capitalize">Category: {item.category}</p>
                  <p className="text-sm">Size: <span className="font-medium">{item.size}</span></p>
                  <p className="text-sm">Quantity: <span className="font-medium">{item.quantity}</span></p>
                  <p className="text-green-700 font-bold mt-1">
                    KES {item.price * item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id, item.size)}
                className="mt-3 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-semibold text-green-700 mt-6">
            Total: KES {total}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
