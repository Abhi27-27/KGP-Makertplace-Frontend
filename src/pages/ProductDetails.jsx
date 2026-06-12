import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryStyle } from '../utils/categoryStyles';

function ProductDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-32 mb-6" />
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-80 bg-slate-200 rounded-xl" />
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 rounded w-24" />
              <div className="h-10 bg-slate-200 rounded w-3/4" />
              <div className="h-8 bg-slate-200 rounded w-1/3" />
              <div className="h-32 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="text-5xl mb-4">😕</div>
        <p className="text-red-600 font-semibold">{error}</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">Back to Listings</Link>
      </div>
    );
  }

  const style = getCategoryStyle(item.category);

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-900 hover:text-brand-800 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Listings
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className={`bg-gradient-to-br ${style.gradient} min-h-[280px] md:min-h-full flex items-center justify-center p-12`}>
            <span className="text-8xl drop-shadow-lg">{style.icon}</span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col">
            <div className="flex-grow">
              <span className={`inline-block text-xs font-bold uppercase px-3 py-1 rounded-full ${style.bg}`}>
                {item.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 leading-tight">
                {item.title}
              </h1>
              <p className="text-3xl font-black text-brand-900 mt-3">₹{item.price}</p>
              <p className="text-sm text-slate-500 mt-2 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item.location}
              </p>

              <div className="border-t border-slate-100 my-6 pt-6">
                <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Seller Information
              </h4>
              <div className="mt-3 space-y-1">
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-800">Name:</span> {item.seller?.name}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-800">Email:</span> {item.seller?.email}
                </p>
              </div>
              <a
                href={`mailto:${item.seller?.email}`}
                className="btn-accent w-full mt-5 !rounded-xl"
              >
                Contact Seller
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
