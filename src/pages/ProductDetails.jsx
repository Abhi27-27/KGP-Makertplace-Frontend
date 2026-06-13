import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCategoryStyle } from '../utils/categoryStyles';
import { useLoading } from '../context/LoadingContext';
import { useChat } from '../context/ChatContext';
import { API_URL, getUserInfo } from '../utils/api';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { withLoading } = useLoading();
  const { startConversation } = useChat();
  const userInfo = getUserInfo();

  useEffect(() => {
    withLoading(
      fetch(`${API_URL}/api/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Product not found');
          return res.json();
        })
        .then(setItem)
        .catch((err) => setError(err.message))
    );
  }, [id, withLoading]);

  const handleChat = async () => {
    if (!userInfo) {
      navigate('/auth');
      return;
    }
    try {
      const conv = await withLoading(startConversation(item._id));
      navigate(`/chat/${conv._id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <p className="text-red-600 font-semibold">{error}</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">Back to Listings</Link>
      </div>
    );
  }

  if (!item) return null;

  const style = getCategoryStyle(item.category);

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-900 mb-6">
        ← Back to Listings
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className={`bg-gradient-to-br ${style.gradient} min-h-[280px] flex items-center justify-center p-12`}>
            <span className="text-8xl">{style.icon}</span>
          </div>
          <div className="p-6 sm:p-8 flex flex-col">
            <span className={`inline-block text-xs font-bold uppercase px-3 py-1 rounded-full w-fit ${style.bg}`}>{item.category}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">{item.title}</h1>
            <p className="text-3xl font-black text-brand-900 mt-3">₹{item.price}</p>
            <p className="text-sm text-slate-500 mt-2">{item.location}</p>

            <div className="border-t border-slate-100 my-6 pt-6">
              <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-auto">
              <h4 className="font-bold text-slate-800">Seller Information</h4>
              <p className="text-sm text-slate-600 mt-1">Name: {item.seller?.name}</p>
              <p className="text-sm text-slate-600">Email: {item.seller?.email}</p>
              <button onClick={handleChat} className="btn-accent w-full mt-4">
                💬 Chat with Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
