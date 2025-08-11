import React from 'react';

const StatsBar = () => {
  return (
    <div className="bg-green-100 py-6 px-4 flex flex-col md:flex-row justify-around text-center text-green-800 font-semibold rounded-md shadow-sm my-6">
      <div>
        <h2 className="text-3xl">30k+</h2>
        <p>Happy Customers</p>
      </div>
      <div>
        <h2 className="text-3xl">500+</h2>
        <p>New Products</p>
      </div>
      <div>
        <h2 className="text-3xl">50M+</h2>
        <p>Followers</p>
      </div>
    </div>
  );
};

export default StatsBar;
