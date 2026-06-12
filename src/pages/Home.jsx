import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryStyle } from '../utils/categoryStyles';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Cycles', 'Books', 'Electronics', 'Academics'];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-900 text-white p-8 sm:p-12 mb-10 shadow-xl shadow-brand-900/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Campus Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Find great deals from fellow{' '}
            <span className="text-amber-400">KGPians</span>
          </h1>
          <p className="mt-4 text-blue-100/90 text-base sm:text-lg leading-relaxed">
            Buy and sell cycles, books, electronics, and academic essentials — all within campus.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search cycles, books, mattress..."
              className="input-field !pl-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-brand-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          {category === 'All' ? 'All Listings' : category}
        </h2>
        <span className="text-sm text-slate-500">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-slate-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-slate-800">No listings found</h3>
          <p className="mt-2 text-slate-500 max-w-md mx-auto">
            {search || category !== 'All'
              ? 'Try adjusting your search or category filter.'
              : 'Be the first to list something on the marketplace!'}
          </p>
          <Link to="/sell" className="btn-accent mt-6 inline-flex">
            List an Item
          </Link>
        </div>
      )}

      {/* Product grid */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const style = getCategoryStyle(product.category);
            return (
              <article
                key={product._id}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className={`relative h-48 bg-gradient-to-br ${style.gradient} flex items-center justify-center overflow-hidden`}>
                  <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {style.icon}
                  </span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <div className="p-4 flex-grow">
                  <span className={`inline-block text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full ${style.bg}`}>
                    {product.category}
                  </span>
                  <h3 className="text-base font-bold mt-2.5 text-slate-800 line-clamp-1 group-hover:text-brand-900 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {product.location}
                  </p>
                </div>
                <div className="px-4 pb-4 pt-0 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-slate-900">₹{product.price}</span>
                  <Link
                    to={`/product/${product._id}`}
                    className="text-sm font-semibold text-brand-900 bg-brand-50 hover:bg-brand-900 hover:text-white px-3.5 py-1.5 rounded-lg transition-all duration-200"
                  >
                    View
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
