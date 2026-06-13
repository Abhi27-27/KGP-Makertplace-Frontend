import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuthHeaders, API_URL } from '../utils/api';
import { useLoading } from '../context/LoadingContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', rollNumber: '', password: '' });
  const navigate = useNavigate();
  const { withLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await withLoading(
        fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch {
      alert('Server error. Is your backend running?');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900">{isLogin ? 'Welcome back' : 'Join the marketplace'}</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button type="button" onClick={() => setIsLogin(true)} className={`flex-1 py-3.5 text-sm font-semibold ${isLogin ? 'text-brand-900 border-b-2 border-brand-900 bg-brand-50/50' : 'text-slate-500'}`}>Login</button>
          <button type="button" onClick={() => setIsLogin(false)} className={`flex-1 py-3.5 text-sm font-semibold ${!isLogin ? 'text-brand-900 border-b-2 border-brand-900 bg-brand-50/50' : 'text-slate-500'}`}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {!isLogin && (
            <>
              <input type="text" placeholder="Full Name" required className="input-field" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="text" placeholder="Roll Number" required className="input-field" onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} />
            </>
          )}
          <input type="email" placeholder="Email" required className="input-field" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password" required className="input-field" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <button type="submit" className="btn-primary w-full !py-3">{isLogin ? 'Sign In' : 'Create Account'}</button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        <Link to="/" className="text-xs text-slate-400 hover:text-slate-600">← Back to marketplace</Link>
      </p>
    </div>
  );
}

export default Auth;
