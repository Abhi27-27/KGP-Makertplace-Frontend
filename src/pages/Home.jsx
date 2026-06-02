import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]); // 1. Start with an empty list
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // 2. Fetch data from your backend when the page loads
  const API_URL = import.meta.env.VITE_API_URL || '';

 useEffect(() => {
      fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received from backend:", data); // <-- ADD THIS LINE
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 4. Filter the REAL products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search and Filter Section - Unchanged */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search cycles, books, mattress..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Cycles">Cycles</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Academics">Academics</option>
        </select>
      </div>

      {/* Grid Layout - Now using 'filteredProducts' from the backend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover bg-gray-100" />
            <div className="p-4 flex-grow">
              <span className="text-xs font-semibold text-blue-900 uppercase bg-blue-50 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <h3 className="text-lg font-bold mt-2 text-gray-800 line-clamp-1">{product.title}</h3>
              <p className="text-sm text-gray-500 mt-1">📍 {product.location}</p>
            </div>
            <div className="p-4 pt-0 flex items-center justify-between">
              <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
              <Link 
                to={`/product/${product._id}`} 
                className="bg-blue-900 hover:bg-blue-800 text-white text-sm px-3 py-1.5 rounded transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;