import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  // Check if the user's digital ID card is saved in the browser
  const userInfo = localStorage.getItem('userInfo');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold tracking-wide">
              KGP <span className="text-yellow-400">Marketplace</span>
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Browse</Link>
            <Link 
              to="/sell" 
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Sell Item
            </Link>
            
            {/* If logged in, show Logout. If not, show Login. */}
            {userInfo ? (
              <button 
                onClick={handleLogout} 
                className="text-sm bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="text-sm bg-blue-800 border border-blue-700 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;