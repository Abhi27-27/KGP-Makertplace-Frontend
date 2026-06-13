import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryStyle } from '../utils/categoryStyles';
import { getAuthHeaders, API_URL, getUserInfo } from '../utils/api';
import { useLoading } from '../context/LoadingContext';

function Dashboard() {
  const [myItems, setMyItems] = useState([]);
  const userInfo = getUserInfo();
  const { withLoading } = useLoading();

  useEffect(() => {
    if (userInfo?._id) {
      withLoading(
        fetch(`${API_URL}/api/products/user/${userInfo._id}`, { headers: getAuthHeaders() })
          .then((res) => res.json())
          .then(setMyItems)
          .catch((err) => console.error(err))
      );
    }
    // 🚨 CRITICAL FIX: Change userInfo to userInfo?._id
  }, [userInfo?._id, withLoading]);

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      const response = await withLoading(
        fetch(`${API_URL}/api/products/${productId}`, { method: 'DELETE', headers: getAuthHeaders() })
      );
      if (response.ok) {
        setMyItems(myItems.filter((item) => item._id !== productId));
      } else {
        alert('Failed to delete item.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!userInfo) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <h2 className="text-xl font-bold">Login Required</h2>
        <Link to="/auth" className="btn-primary mt-6 inline-flex">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-extrabold">My Dashboard</h2>
          <p className="text-slate-500">Welcome, {userInfo.name}</p>
        </div>
        <Link to="/sell" className="btn-accent !text-sm">+ New Listing</Link>
      </div>

      {myItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500">No active listings.</p>
          <Link to="/sell" className="btn-accent mt-4 inline-flex">List Your First Item</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myItems.map((item) => {
            const style = getCategoryStyle(item.category);
            return (
              <div key={item._id} className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
                    <span className="text-2xl">{style.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-extrabold">₹{item.price}</span>
                  <button onClick={() => handleDelete(item._id)} className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-colors">
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
