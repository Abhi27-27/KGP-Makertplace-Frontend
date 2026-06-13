import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategoryStyle } from '../utils/categoryStyles';
import { useLoading } from '../context/LoadingContext';
import { API_URL } from '../utils/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { withLoading } = useLoading();
  const categories = ['All', 'Cycles', 'Books', 'Electronics', 'Academics'];

  useEffect(() => {
    withLoading(
      fetch(`${API_URL}/api/products`)
        .then((res) => res.json())
        .then(setProducts)
        .catch((err) => console.error('Error fetching products:', err))
    );
  }, [withLoading]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-900 text-white p-8 sm:p-12 mb-10 shadow-xl">
        <div className="relative max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Campus Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Find great deals from fellow <span className="text-amber-400">KGPians</span>
          </h1>
          <p className="mt-4 text-blue-100/90">Buy and sell cycles, books, electronics, and academic essentials.</p>
        </div>
      </section>

      <div className="glass-card rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <input
            type="text"
            placeholder="Search cycles, books, mattress..."
            className="input-field flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat ? 'bg-brand-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">{category === 'All' ? 'All Listings' : category}</h2>
        <span className="text-sm text-slate-500">{filteredProducts.length} items</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-slate-800">No listings found</h3>
          <Link to="/sell" className="btn-accent mt-6 inline-flex">List an Item</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const style = getCategoryStyle(product.category);
            return (
              <article key={product._id} className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
                <div className={`h-48 bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
                  <span className="text-6xl">{style.icon}</span>
                </div>
                <div className="p-4 flex-grow">
                  <span className={`text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full ${style.bg}`}>{product.category}</span>
                  <h3 className="text-base font-bold mt-2 text-slate-800 line-clamp-1">{product.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{product.location}</p>
                </div>
                <div className="px-4 pb-4 flex items-center justify-between">
                  <span className="text-xl font-extrabold">₹{product.price}</span>
                  <Link to={`/product/${product._id}`} className="text-sm font-semibold text-brand-900 bg-brand-50 hover:bg-brand-900 hover:text-white px-3.5 py-1.5 rounded-lg transition-all">
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
