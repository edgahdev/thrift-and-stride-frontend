import React from 'react';

const Newsletter = () => {
  return (
    <div className="bg-green-50 py-8 px-4 mt-6 text-center">
      <h3 className="text-xl font-semibold text-green-700 mb-2">Subscribe to Our Newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">Get exclusive offers and product updates straight to your inbox.</p>
      <form className="flex flex-col sm:flex-row justify-center gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-green-300 rounded px-3 py-2 w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
