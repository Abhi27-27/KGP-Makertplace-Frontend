import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Cycles', 'Books', 'Electronics', 'Academics'];

function CreateListing() {
  const [formData, setFormData] = useState({
    title: '', price: '', category: '', location: '', description: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert('Please select a category.');
      return;
    }

    // ── GET LOGGED-IN USER FROM LOCALSTORAGE ──
    const user = JSON.parse(localStorage.getItem('userInfo'));  // adjust key if yours is different
    if (!user || !user._id) {
      alert('You must be logged in to list an item.');
      navigate('/login');
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          seller: user._id   // ── SEND SELLER ID TO BACKEND ──
        })
      });

      const data = await response.json();  // ── SEE EXACT ERROR FROM BACKEND ──
      console.log('Backend response:', data);

      if (response.ok) {
        alert('Item successfully listed on KGP Marketplace!');
        navigate('/');
      } else {
        alert(`Failed: ${data.message}`);  // shows exact reason now
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Backend not responding!');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">List an Item for Sale</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Item Title"
          className="w-full p-2 border rounded"
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          onChange={e => setFormData({ ...formData, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Hall of Residence"
          className="w-full p-2 border rounded"
          onChange={e => setFormData({ ...formData, location: e.target.value })}
        />

        {/* CATEGORY PILLS */}
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">
            Select Category <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat })}
                className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all
                  ${formData.category === cat
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-900 hover:text-blue-900'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {formData.category && (
            <p className="text-xs text-green-600 mt-1">✓ Selected: {formData.category}</p>
          )}
        </div>

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />

        <button type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded">
          Publish Listing
        </button>

      </form>
    </div>
  );
}

export default CreateListing;