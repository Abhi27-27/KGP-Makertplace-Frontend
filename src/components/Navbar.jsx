import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-900/95 backdrop-blur-md text-white shadow-lg shadow-brand-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-brand-900 font-extrabold text-sm">K</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              KGP <span className="text-amber-400">Marketplace</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/sell"
              className="ml-2 btn-accent !py-2 !px-4 !text-sm !rounded-lg"
            >
              Sell Item
            </Link>

            {userInfo ? (
              <>
                <Link
                  to="/dashboard"
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="ml-3 flex items-center gap-3 pl-3 border-l border-white/20">
                  <span className="text-sm text-white/70 hidden lg:inline">
                    {userInfo.name?.split(' ')[0] || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-white/10 hover:bg-red-500/90 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="ml-3 text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-800/98 backdrop-blur-md border-t border-white/10 px-4 pt-2 pb-4 space-y-1">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium hover:bg-white/10 transition-colors"
          >
            Browse
          </Link>
          <Link
            to="/sell"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold bg-accent-500 text-brand-900 hover:bg-accent-600 transition-colors"
          >
            Sell Item
          </Link>

          {userInfo ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium hover:bg-white/10 transition-colors"
              >
                My Dashboard
              </Link>
              <div className="pt-3 mt-2 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold bg-red-500/90 hover:bg-red-600 transition-colors"
                >
                  Logout ({userInfo.name || 'User'})
                </button>
              </div>
            </>
          ) : (
            <div className="pt-3 mt-2 border-t border-white/10">
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium bg-white/10 hover:bg-white/20 transition-colors"
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
