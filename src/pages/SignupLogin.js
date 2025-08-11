import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupLogin = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setForm({ name: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? 'signup' : 'login';

    try {
      const res = await axios.post(`http://localhost:5000/api/users/${endpoint}`, form);
      setMessage(`✅ ${isSignup ? 'Account created' : 'Login successful'}`);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAdmin', res.data.isAdmin);
      navigate('/products');
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Something went wrong');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignup ? 'Create Account' : 'Login to Your Account'}
      </h2>

      {message && <div className="mb-4 text-red-600 text-center">{message}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={toggleForm} className="text-blue-600 underline">
          {isSignup ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default SignupLogin;
