import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryStyle } from '../utils/categoryStyles';
import { getAuthHeaders } from '../utils/api';

function Dashboard() {
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    if (userInfo && userInfo._id) {
      fetch(`${API_URL}/api/products/user/${userInfo._id}`, {
        headers: getAuthHeaders(),
      })
        .then((res) => res.json())
        .then((data) => {
          setMyItems(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching dashboard items:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userInfo, API_URL]);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        const response = await fetch(`${API_URL}/api/products/${productId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (response.ok) {
          setMyItems(myItems.filter(item => item._id !== productId));
        } else {
          alert('Failed to delete item.');
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  if (!userInfo) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-slate-800">Login Required</h2>
        <p className="mt-2 text-slate-500">Please log in to view your dashboard.</p>
        <Link to="/auth" className="btn-primary mt-6 inline-flex">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Dashboard</h2>
          <p className="mt-1 text-slate-500">
            Welcome back, <span className="font-medium text-slate-700">{userInfo.name}</span>
          </p>
        </div>
        <Link to="/sell" className="btn-accent !text-sm shrink-0">
          + New Listing
        </Link>
      </div>

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm animate-pulse flex gap-4">
              <div className="w-20 h-20 bg-slate-200 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && myItems.length === 0 && (
        <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-slate-800">No active listings</h3>
          <p className="mt-2 text-slate-500">You haven&apos;t listed any items for sale yet.</p>
          <Link to="/sell" className="btn-accent mt-6 inline-flex">List Your First Item</Link>
        </div>
      )}

      {!loading && myItems.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">{myItems.length} active {myItems.length === 1 ? 'listing' : 'listings'}</p>
          {myItems.map((item) => {
            const style = getCategoryStyle(item.category);
            return (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shrink-0 shadow-sm`}>
                    <span className="text-3xl">{style.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {item.location}
                    </p>
                    <span className={`inline-block mt-1.5 text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full ${style.bg}`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-4 sm:gap-6 pl-24 sm:pl-0">
                  <span className="text-xl font-extrabold text-slate-900">₹{item.price}</span>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
