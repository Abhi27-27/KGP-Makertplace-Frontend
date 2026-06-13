import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuthHeaders, API_URL, getUserInfo } from '../utils/api';
import { useLoading } from '../context/LoadingContext';

const CATEGORIES = ['Cycles', 'Books', 'Electronics', 'Academics'];

function CreateListing() {
  const [formData, setFormData] = useState({ title: '', price: '', category: '', location: '', description: '' });
  const navigate = useNavigate();
  const { withLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      alert('Please select a category.');
      return;
    }

    const user = getUserInfo();
    if (!user?._id) {
      alert('You must be logged in to list an item.');
      navigate('/auth');
      return;
    }

    try {
      const response = await withLoading(
        fetch(`${API_URL}/api/products`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        })
      );

      const data = await response.json();
      if (response.ok) {
        alert('Item successfully listed!');
        navigate('/');
      } else {
        alert(`Failed: ${data.message}`);
      }
    } catch {
      alert('Backend not responding!');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">List an Item for Sale</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Item Title" className="input-field" required onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="number" placeholder="Price" className="input-field" required min="0" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <input type="text" placeholder="Hall of Residence" className="input-field" required onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Category *</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    formData.category === cat ? 'bg-brand-900 text-white border-brand-900' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <textarea placeholder="Description" className="input-field min-h-[120px]" required onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <button type="submit" className="btn-primary w-full !py-3">Publish Listing</button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
