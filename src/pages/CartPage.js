import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const shippingOptions = [
  { name: "Free Pick-up at Our Store (Kasarani Hunters 12th street)", price: 0 },
  { name: "Nairobi CBD / Town", price: 100 },
  { name: "Eldoret Town", price: 150 },
  { name: "Iten", price: 150 },
  { name: "Kapsabet, Kapsowar, Mosoriot & Moi University", price: 150 },
  { name: "Pick Up Mtaani", price: 150 },
  { name: "Kitengela (REMBO courier)", price: 200 },
  { name: "NYANZA", price: 200 },
  { name: "Thika, Juja (Super Metro Courier)", price: 200 },
  { name: "Kericho, Litein & Bomet", price: 250 },
  { name: "Kitale, Matunda, Moi bridge", price: 250 },
  { name: "Nakuru", price: 250 },
  { name: "REGION 1", price: 250 },
  { name: "WESTERN REGION", price: 250 },
  { name: "REGION 2", price: 300 },
  { name: "Region 3", price: 300 },
  { name: "REGION 4", price: 350 },
  { name: "CENTRAL REGION", price: 400 },
  { name: "COAST REGION", price: 400 },
  { name: "EASTERN REGION", price: 400 },
  { name: "KISII & NYAMIRA", price: 400 },
];

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [tab, setTab] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + Number(item.price), 0);
  const total = subtotal + shippingCost;

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const orderData = {
      items: cart,
      total,
      customer: deliveryInfo
    };

    if (paymentMethod === "pesapal") {
      try {
        const res = await fetch("https://thrift-and-stride-backend.onrender.com/api/payment/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            email: deliveryInfo.email || "customer@example.com",
            phone: deliveryInfo.phone || "0712345678",
            orderId: Date.now().toString(),
          }),
        });

        const data = await res.json();

        if (data.redirectUrl) {
          // Save order before redirect
          const orderRes = await fetch("https://thrift-and-stride-backend.onrender.com/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });

          const savedOrder = await orderRes.json();
          localStorage.setItem("trackingOrderId", savedOrder._id);

          window.location.href = data.redirectUrl;
        } else {
          alert("Payment initiation failed");
        }
      } catch (error) {
        console.error(error);
        alert("Error initiating payment");
      }
    }

    if (paymentMethod === "mpesa") {
      alert("M-Pesa STK Push flow goes here");
    }
    if (paymentMethod === "airtel") {
      alert("Airtel Money integration goes here");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛒 Checkout</h2>

      {/* Tabs Navigation */}
      <div className="flex gap-4 mb-6 border-b">
        {["Cart", "Delivery", "Payment"].map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i + 1)}
            className={`px-4 py-2 border-b-4 ${
              tab === i + 1
                ? "border-green-600 text-green-600 font-bold"
                : "border-transparent text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TAB 1: Cart */}
      {tab === 1 && (
        <div>
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
                Subtotal:{" "}
                <span className="text-green-700">KES {subtotal}</span>
              </div>
              <button
                onClick={() => setTab(2)}
                className="mt-6 py-3 bg-green-600 text-white w-full rounded hover:bg-green-700"
              >
                Continue to Delivery →
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Delivery */}
      {tab === 2 && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First name"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, lastName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
            }
          />
          <select
            className="w-full border p-2 rounded"
            onChange={(e) => {
              const option = shippingOptions.find(
                (o) => o.name === e.target.value
              );
              setShippingCost(option ? option.price : 0);
            }}
          >
            <option value="">Choose shipping method</option>
            {shippingOptions.map((opt, idx) => (
              <option key={idx} value={opt.name}>
                {opt.name} - KES {opt.price}
              </option>
            ))}
          </select>
          <div className="text-right text-lg font-bold">
            Shipping: KES {shippingCost}
          </div>
          <div className="text-right text-xl font-bold">
            Total: KES {total}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setTab(1)}
              className="py-3 bg-gray-400 text-white w-full rounded hover:bg-gray-500"
            >
              ← Back to Cart
            </button>
            <button
              onClick={() => setTab(3)}
              className="py-3 bg-green-600 text-white w-full rounded hover:bg-green-700"
            >
              Continue to Payment →
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Payment */}
      {tab === 3 && (
        <div className="space-y-4">
          <p className="font-bold text-lg">Select Payment Method</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="mpesa"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Lipa na M-Pesa
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="pesapal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Pesapal
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="airtel"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Airtel Money
            </label>
          </div>
          <div className="text-right text-xl font-bold">
            Total: KES {total}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setTab(2)}
              className="py-3 bg-gray-400 text-white w-full rounded hover:bg-gray-500"
            >
              ← Back to Delivery
            </button>
            <button
              onClick={handlePayment}
              className="py-3 bg-green-600 text-white w-full rounded hover:bg-green-700"
            >
              Pay Now 💳
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
