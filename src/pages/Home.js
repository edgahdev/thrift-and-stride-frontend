import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import CategoryCards from '../components/CategoryCards';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Dresses' && product.category === 'dresses') ||
      (selectedCategory === 'Shoes' && product.category === 'shoes') ||
      (selectedCategory === 'Others' && product.category !== 'dresses' && product.category !== 'shoes');
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Animated Hero */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      {/* Animated Category Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <CategoryCards />
      </motion.div>

      {/* Category Tabs with Hover Animations */}
      <motion.div className="flex justify-center gap-3 mt-10 mb-4">
        {['All', 'Dresses', 'Shoes', 'Others'].map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm rounded-full border transition font-semibold ${
              selectedCategory === category
                ? 'bg-green-700 text-white'
                : 'bg-white border-green-400 hover:bg-green-100 text-green-700'
            }`}
          >
            {category === 'All' && '🛍️ All'}
            {category === 'Dresses' && '👗 Dresses'}
            {category === 'Shoes' && '👟 Shoes'}
            {category === 'Others' && '🎒 Others'}
          </motion.button>
        ))}
      </motion.div>

      {/* Featured Products with Fade-in Animation */}
      <motion.section
        className="p-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-xl font-bold text-green-700 mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Featured Products
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredProducts.slice(0, 8).map(product => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            See More
          </motion.button>
        </div>
      </motion.section>

      {/* Animated Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <WhyChooseUs />
      </motion.div>

      {/* Animated Stats Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <StatsBar />
      </motion.div>

      {/* Testimonials with Fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Testimonials />
      </motion.div>

      {/* Newsletter with Slide-up Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Newsletter />
      </motion.div>
    </div>
  );
};

export default Home;
