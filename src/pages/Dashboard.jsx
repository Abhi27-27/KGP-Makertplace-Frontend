import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryStyle } from '../utils/categoryStyles';
import { getAuthHeaders, API_URL, getUserInfo } from '../utils/api';
import { useLoading } from '../context/LoadingContext';

const CATEGORIES = ['Cycles', 'Books', 'Electronics', 'Academics'];

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider w-24 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-800 break-all">{value || '—'}</span>
    </div>
  );
}

function StatBox({ label, value, colorClass }) {
  return (
    <div className={`rounded-xl p-4 flex flex-col gap-1 ${colorClass}`}>
      <span className="text-2xl font-extrabold">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</span>
    </div>
  );
}

function EditModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    title: item.title,
    price: item.price,
    category: item.category,
    location: item.location,
    description: item.description,
  });
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Edit Listing</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Title
            </label>
            <input type="text" className="input-field" value={form.title} onChange={set('title')} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Price (₹)
              </label>
              <input type="number" min="0" className="input-field" value={form.price} onChange={set('price')} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Hall / Location
              </label>
              <input type="text" className="input-field" value={form.location} onChange={set('location')} />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    form.category === cat
                      ? 'bg-brand-900 text-white border-brand-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Description
            </label>
            <textarea
              className="input-field min-h-[100px] resize-none"
              value={form.description}
              onChange={set('description')}
            />
          </div>
        </div>

        <div className="flex gap-3 px-6 py-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="flex-1 btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Account() {
  const [myItems, setMyItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [profile, setProfile] = useState(null);
  const userInfo = getUserInfo();
  const { withLoading } = useLoading();

  const soldCount = myItems.filter((i) => i.status === 'sold').length;
  const activeCount = myItems.filter((i) => i.status !== 'sold').length;

  useEffect(() => {
    if (!userInfo?._id) return;

    withLoading(
      fetch(`${API_URL}/api/auth/me`, { headers: getAuthHeaders() })
        .then((res) => res.json())
        .then(setProfile)
        .catch(console.error)
    );

    withLoading(
      fetch(`${API_URL}/api/products/user/${userInfo._id}`, { headers: getAuthHeaders() })
        .then((res) => res.json())
        .then(setMyItems)
        .catch(console.error)
    );
  }, [userInfo?._id, withLoading]);

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this listing permanently?')) return;
    const res = await withLoading(
      fetch(`${API_URL}/api/products/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    );
    if (res.ok) {
      setMyItems((prev) => prev.filter((i) => i._id !== productId));
    } else {
      alert('Failed to delete listing.');
    }
  };

  const handleMarkSold = async (productId) => {
    const res = await withLoading(
      fetch(`${API_URL}/api/products/${productId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: 'sold' }),
      })
    );
    if (res.ok) {
      setMyItems((prev) =>
        prev.map((i) => (i._id === productId ? { ...i, status: 'sold' } : i))
      );
    }
  };

  const handleEditSave = async (form) => {
    const res = await withLoading(
      fetch(`${API_URL}/api/products/${editingItem._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      })
    );
    if (res.ok) {
      const updated = await res.json();
      setMyItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
      setEditingItem(null);
    } else {
      alert('Failed to update listing.');
    }
  };

  if (!userInfo) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-slate-800">Login Required</h2>
        <p className="text-slate-500 mt-2 text-sm">Sign in to view your account.</p>
        <Link to="/auth" className="btn-primary mt-6 inline-flex">
          Sign In
        </Link>
      </div>
    );
  }

  const joinYear = profile?.createdAt
    ? new Date(profile.createdAt).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Account</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your profile and listings</p>
      </div>

      {/* Profile + Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 flex items-center justify-center shadow-md shrink-0">
              <span className="text-xl font-extrabold text-white">
                {userInfo.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">{userInfo.name}</h2>
              <span className="inline-block mt-0.5 text-xs font-semibold bg-brand-50 text-brand-900 px-2.5 py-0.5 rounded-full">
                KGP Student
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            <InfoRow label="Email" value={profile?.email ?? userInfo.email} />
            <InfoRow label="Roll No." value={profile?.rollNumber ?? '—'} />
            <InfoRow label="Member Since" value={`Class of ${joinYear}`} />
          </div>
        </div>

        {/* Stats Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
            Activity
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <StatBox
              label="Uploaded"
              value={myItems.length}
              colorClass="bg-brand-50 text-brand-900"
            />
            <StatBox
              label="Sold"
              value={soldCount}
              colorClass="bg-emerald-50 text-emerald-700"
            />
            <StatBox
              label="Active"
              value={activeCount}
              colorClass="bg-amber-50 text-amber-700"
            />
            <StatBox
              label="Since"
              value={joinYear}
              colorClass="bg-violet-50 text-violet-700"
            />
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">My Listings</h3>
            <p className="text-xs text-slate-400 mt-0.5">{myItems.length} total · {activeCount} active · {soldCount} sold</p>
          </div>
          <Link to="/sell" className="btn-accent !text-sm !py-1.5 !px-4">
            + New Listing
          </Link>
        </div>

        {myItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-slate-500 font-medium">No listings yet.</p>
            <p className="text-sm text-slate-400 mt-1">Start selling to see your items here.</p>
            <Link to="/sell" className="btn-accent inline-flex mt-5">
              List Your First Item
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {myItems.map((item) => {
              const style = getCategoryStyle(item.category);
              const isSold = item.status === 'sold';
              return (
                <div
                  key={item._id}
                  className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors ${
                    isSold ? 'opacity-55' : ''
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center`}
                  >
                    <span className="text-lg">{style.icon}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate text-sm">{item.title}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.bg}`}>
                        {item.category}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isSold
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {isSold ? 'Sold' : 'Active'}
                      </span>
                      <span className="text-xs text-slate-400">{item.location}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="font-extrabold text-slate-900 text-sm shrink-0">₹{item.price}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {!isSold ? (
                      <>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-900 hover:bg-brand-900 hover:text-white transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleMarkSold(item._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                          Sold
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 px-3 py-1.5">—</span>
                    )}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
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

      {/* Edit Modal */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}

export default Account;
