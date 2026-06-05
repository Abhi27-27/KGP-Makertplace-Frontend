import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  // We need to add a 'state' to track if the mobile menu is open or closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Area */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold tracking-wide">
              KGP <span className="text-yellow-400">Marketplace</span>
            </Link>
          </div>

          {/* DESKTOP MENU (Hidden on phones) */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Browse</Link>
            <Link 
              to="/sell" 
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Sell Item
            </Link>
            
            {userInfo ? (
              <>
                <Link to="/dashboard" className="text-sm font-semibold hover:text-yellow-400 transition-colors">
                  My Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-sm bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="text-sm bg-blue-800 border border-blue-700 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON (Hamburger Icon - Hidden on desktop) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {/* Icon changes from ☰ to X depending on state */}
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
          >
            Browse
          </Link>
          <Link 
            to="/sell" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium bg-yellow-500 text-blue-900 hover:bg-yellow-600"
          >
            Sell Item
          </Link>

          {userInfo ? (
            <>
              <Link 
                to="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                My Dashboard
              </Link>
              {/* Logout is separated by a subtle border line at the bottom */}
              <div className="pt-4 mt-2 border-t border-blue-700">
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-3 py-2 rounded-md text-base font-bold bg-red-600 text-white hover:bg-red-700"
                >
                  Logout ({userInfo.name || 'User'})
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 mt-2 border-t border-blue-700">
              <Link 
                to="/auth" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-900 border border-blue-700 text-white hover:bg-blue-700"
              >
                Login / Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;