import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ---------- SIGNUP ----------
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        toast.success(data.message, { autoClose: 2000 });
        setName(""); setEmail(""); setPassword("");
        setIsLogin(true);
      } else {
        toast.error(data.message || "Signup failed", { autoClose: 3000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during signup", { autoClose: 3000 });
    }
  };

  // ---------- LOGIN ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        localStorage.setItem("token", data.token);
        toast.success(data.message, { autoClose: 2000 });
        setEmail(""); setPassword("");
        navigate("/account");
      } else {
        toast.error(data.message || "Invalid credentials", { autoClose: 3000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during login", { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 p-4">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-300 hover:scale-[1.02] hover:shadow-green-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="flex flex-col gap-4"
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-green-300 transition-transform transform hover:scale-[1.02]"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupLogin;
