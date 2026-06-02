import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', rollNumber: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    const API_URL = import.meta.env.VITE_API_URL || '';

  try {
  const response = await fetch(`${API_URL}${endpoint}`,  {
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
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">
        {isLogin ? 'Login to KGP Marketplace' : 'Create an Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input type="text" placeholder="Full Name" required
              className="w-full p-2 border rounded"
              onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="text" placeholder="Roll Number (e.g., 21CS10000)" required
              className="w-full p-2 border rounded"
              onChange={e => setFormData({...formData, rollNumber: e.target.value})} />
          </>
        )}
        <input type="email" placeholder="Email" required
          className="w-full p-2 border rounded"
          onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required
          className="w-full p-2 border rounded"
          onChange={e => setFormData({...formData, password: e.target.value})} />
        
        <button type="submit" className="w-full bg-blue-900 text-white font-bold py-2 rounded">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-900 font-bold hover:underline">
          {isLogin ? 'Sign up here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}

export default Auth;