import React from 'react';
import { FaLeaf, FaTools, FaCheckCircle } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <div className="bg-white py-10 px-4 my-6">
      <h2 className="text-2xl text-green-700 font-bold text-center mb-4">Why Choose Us</h2>
      <div className="flex flex-col md:flex-row justify-around items-center gap-6 text-center">
        <div>
          <FaTools className="text-green-600 text-4xl mx-auto mb-2" />
          <p className="font-semibold">In-house Production</p>
        </div>
        <div>
          <FaLeaf className="text-green-600 text-4xl mx-auto mb-2" />
          <p className="font-semibold">Sustainable Materials</p>
        </div>
        <div>
          <FaCheckCircle className="text-green-600 text-4xl mx-auto mb-2" />
          <p className="font-semibold">Quality You Can Trust</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
