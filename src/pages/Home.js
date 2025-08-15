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

const Home = ({ searchTerm = '' }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Updated to deployed backend
        const res = await axios.get('https://thrift-and-stride-backend.onrender.com/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback dummy data (optional)
        const dummyData = Array.from({ length: 20 }, (_, i) => ({
          _id: i.toString(),
          title: `Product ${i + 1}`,
          category: i % 2 === 0 ? 'dresses' : 'shoes',
          image: 'https://via.placeholder.com/150',
          price: (19.99 + i).toFixed(2),
        }));
        setProducts(dummyData);
      }
    };

    fetchProducts();
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

      {/* Category Tabs */}
      <motion.div className="flex justify-center gap-3 mt-10 mb-4">
        {['All', 'Dresses', 'Shoes', 'Others'].map(category => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedCategory(category);
              setVisibleCount(8); // Reset pagination
            }}
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

      {/* Featured Products */}
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
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {filteredProducts.slice(0, visibleCount).map(product => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* See More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="text-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={() => setVisibleCount(prev => prev + 10)}
            >
              See More
            </motion.button>
          </div>
        )}
      </motion.section>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <WhyChooseUs />
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <StatsBar />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Testimonials />
      </motion.div>

      {/* Newsletter */}
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
