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

    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || !user._id) {
      alert('You must be logged in to list an item.');
      navigate('/auth');
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          seller: user._id
        })
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (response.ok) {
        alert('Item successfully listed on KGP Marketplace!');
        navigate('/');
      } else {
        alert(`Failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Backend not responding!');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">List an Item for Sale</h2>
        <p className="mt-2 text-slate-500 text-sm">Share what you no longer need with fellow KGPians</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Item Title</label>
            <input
              type="text"
              placeholder="e.g. Hero Sprint Pro Cycle"
              className="input-field"
              required
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (₹)</label>
              <input
                type="number"
                placeholder="2500"
                className="input-field"
                required
                min="0"
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Hall of Residence</label>
              <input
                type="text"
                placeholder="e.g. Azad Hall"
                className="input-field"
                required
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                    ${formData.category === cat
                      ? 'bg-brand-900 text-white border-brand-900 shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-800 hover:text-brand-900'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {formData.category && (
              <p className="text-xs text-emerald-600 mt-2 font-medium">✓ Selected: {formData.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea
              placeholder="Describe the condition, age, and any other details..."
              className="input-field min-h-[120px] resize-y"
              required
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary w-full !py-3">
            Publish Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
