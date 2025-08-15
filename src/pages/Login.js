import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Change the URL to your deployed backend
      const res = await axios.post(
        'https://thrift-and-stride-backend.onrender.com/api/auth/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAdmin', res.data.isAdmin);

      if (res.data.isAdmin) {
        navigate('/admin');
      } else {
        alert('You are not admin!');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="grid gap-3">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
