import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/signup-login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // show nothing until redirected
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        {/* Avatar */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Profile Avatar"
            className="w-24 h-24 mx-auto rounded-full border mb-4 object-cover"
          />
        ) : (
          <FaUserCircle size={80} className="mx-auto text-gray-500 mb-4" />
        )}

        {/* Name & Email */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {user.name || "User"}
        </h2>
        <p className="text-gray-600">{user.email}</p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            My Orders
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
