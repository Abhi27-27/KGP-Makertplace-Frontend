import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', rollNumber: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    const API_URL = import.meta.env.VITE_API_URL || '';

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        alert('Success!');
        navigate('/');
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Is your backend running?');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg mb-4">
          <span className="text-brand-900 font-extrabold text-xl">K</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          {isLogin ? 'Welcome back' : 'Join the marketplace'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {isLogin ? 'Sign in to your KGP Marketplace account' : 'Create your campus account'}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
              isLogin
                ? 'text-brand-900 border-b-2 border-brand-900 bg-brand-50/50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
              !isLogin
                ? 'text-brand-900 border-b-2 border-brand-900 bg-brand-50/50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  className="input-field"
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Roll Number</label>
                <input
                  type="text"
                  placeholder="e.g. 21CS10000"
                  required
                  className="input-field"
                  onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@iitkgp.ac.in"
              required
              className="input-field"
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="input-field"
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary w-full !py-3 mt-2">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-brand-900 font-semibold hover:underline"
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </p>

      <p className="mt-4 text-center">
        <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
          ← Back to marketplace
        </Link>
      </p>
    </div>
  );
}

export default Auth;
