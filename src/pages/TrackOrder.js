// TrackOrder.js
import React, { useState } from "react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId.trim()) {
      setError("Please enter your order ID");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      if (!response.ok) throw new Error("Order not found");
      const data = await response.json();
      setOrderData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter your order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleTrack}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Tracking..." : "Track Order"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {orderData && (
        <div className="mt-6 border p-4 rounded">
          <h3 className="font-semibold">Order ID: {orderData._id}</h3>
          <p>Status: {orderData.status}</p>
          <p>Total: KSh {orderData.total}</p>
          <p>Date: {new Date(orderData.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
