import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { getUserInfo } from '../utils/api';

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userInfo = getUserInfo();
  const { unreadCount } = useChat();

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
            <Link to="/" className="px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors">
              Browse
            </Link>
            <Link to="/sell" className="ml-2 btn-accent !py-2 !px-4 !text-sm !rounded-lg">
              Sell Item
            </Link>

            {userInfo && (
              <Link to="/chat" className="relative ml-2 px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                Messages
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Link>
            )}

            {userInfo ? (
              <>
                <Link to="/dashboard" className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="ml-3 text-sm bg-white/10 hover:bg-red-500/90 text-white px-3 py-1.5 rounded-lg transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="ml-3 text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10" aria-label="Toggle menu">
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
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-base font-medium hover:bg-white/10">Browse</Link>
          <Link to="/sell" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-base font-semibold bg-accent-500 text-brand-900">Sell Item</Link>
          {userInfo && (
            <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-base font-medium hover:bg-white/10">
              Messages {unreadCount > 0 && `(${unreadCount})`}
            </Link>
          )}
          {userInfo ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg hover:bg-white/10">Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-lg bg-red-500/90 font-semibold">Logout</button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg bg-white/10">Login / Sign Up</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
