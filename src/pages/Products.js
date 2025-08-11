import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = category === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === category);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">Our Boutique Products</h2>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-6">
        {['all', 'shoes', 'dresses'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setCurrentPage(1); // Reset pagination
            }}
            className={`px-4 py-2 rounded-full transition font-semibold text-sm ${
              category === cat
                ? 'bg-green-700 text-white'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {cat === 'all' && '🛍️ All'}
            {cat === 'shoes' && '👟 Shoes'}
            {cat === 'dresses' && '👗 Dresses'}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center py-20">
          <ClipLoader size={40} color="#16a34a" />
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map(product => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 border rounded hover:bg-green-100"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === i + 1 ? 'bg-green-700 text-white' : 'bg-green-100 hover:bg-green-200'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 border rounded hover:bg-green-100"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Products;
