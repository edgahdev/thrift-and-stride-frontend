import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow flex items-center justify-between bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">KES {item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Total: <span className="text-green-700">KES {total}</span>
          </div>

          {/* M-Pesa Payment Button */}
          <button
            className="w-full mt-6 py-3 bg-green-600 text-white text-lg font-bold rounded hover:bg-green-700 transition"
          >
            Lipa na M-Pesa 💳
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
