import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-lg font-bold text-slate-900">
              KGP <span className="text-amber-500">Marketplace</span>
            </p>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Buy and sell within the IIT Kharagpur campus community — cycles, books, electronics, and more.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/" className="text-slate-500 hover:text-blue-900 transition-colors">Browse Listings</Link></li>
              <li><Link to="/sell" className="text-slate-500 hover:text-blue-900 transition-colors">Sell an Item</Link></li>
              <li><Link to="/dashboard" className="text-slate-500 hover:text-blue-900 transition-colors">My Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Campus Only</p>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Verified student marketplace for safe, local transactions across halls and departments.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} KGP Marketplace · Built for the campus community
        </div>
      </div>
    </footer>
  );
}

export default Footer;
