import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('add'); // "add" | "view"
  const [product, setProduct] = useState({
    title: '',
    imageUrl: '',
    price: '',
    category: '',
    description: '',
    size: ''
  });
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null); // Track which product is being edited

  // Handle form inputs
  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Fetching failed:', err);
    }
  };

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!token || isAdmin !== 'true') {
      setError('🚫 Only admins can add products.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products/add', product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Product added successfully!');
      setError('');
      setProduct({ title: '', imageUrl: '', price: '', category: '', description: '', size: '' });
      fetchProducts();
      setActiveTab('view'); // switch to view tab after adding
    } catch (err) {
      setError(`❌ ${err.response?.data?.message || 'Error adding product'}`);
      setMessage('');
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!token || isAdmin !== 'true') {
      setError('🚫 Only admins can delete.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setMessage('🗑️ Product deleted!');
      setError('');
    } catch (err) {
      setError(`❌ Failed to delete: ${err.response?.data?.message || err.message}`);
    }
  };

  // Start editing
  const startEdit = (p) => {
    setProduct({
      title: p.title,
      imageUrl: p.imageUrl,
      price: p.price,
      category: p.category,
      description: p.description,
      size: p.size || ''
    });
    setEditingId(p._id);
    setActiveTab('add'); // reuse the form
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!token || isAdmin !== 'true') {
      setError('🚫 Only admins can edit products.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${editingId}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✏️ Product updated successfully!');
      setError('');
      setEditingId(null);
      setProduct({ title: '', imageUrl: '', price: '', category: '', description: '', size: '' });
      fetchProducts();
      setActiveTab('view');
    } catch (err) {
      setError(`❌ Failed to update: ${err.response?.data?.message || err.message}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => { setActiveTab('add'); setEditingId(null); }}
          className={`px-4 py-2 ${activeTab === 'add' ? 'border-b-2 border-blue-600 font-bold' : ''}`}
        >
          {editingId ? '✏️ Edit Product' : '➕ Add Product'}
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`px-4 py-2 ${activeTab === 'view' ? 'border-b-2 border-blue-600 font-bold' : ''}`}
        >
          📦 View Products
        </button>
      </div>

      {/* Feedback */}
      {message && <div className="mb-3 text-green-600 font-semibold">{message}</div>}
      {error && <div className="mb-3 text-red-600 font-semibold">{error}</div>}

      {/* Form */}
      {activeTab === 'add' && (
        <form onSubmit={editingId ? handleUpdate : handleSubmit} className="grid grid-cols-1 gap-3 max-w-xl mb-10">
          <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="imageUrl" placeholder="Image URL" value={product.imageUrl} onChange={handleChange} required className="border p-2 rounded" />
          <input type="number" name="price" placeholder="Price (Ksh)" value={product.price} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="size" placeholder="Size" value={product.size} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="description" placeholder="Product Description" value={product.description} onChange={handleChange} required className="border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      {/* Table */}
      {activeTab === 'view' && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">
                      <img src={p.imageUrl} alt={p.title} className="h-16 w-16 mx-auto object-contain" />
                    </td>
                    <td className="p-2 border">{p.title}</td>
                    <td className="p-2 border">{p.description}</td>
                    <td className="p-2 border">{p.category}</td>
                    <td className="p-2 border font-bold text-green-700">Ksh {p.price}</td>
                    <td className="p-2 border">{p.size || '-'}</td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
