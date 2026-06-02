import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CreateListing from './pages/CreateListing';
import Auth from './pages/Auth'; // <-- 1. MAKE SURE THIS IS HERE

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/sell" element={<CreateListing />} />
            <Route path="/auth" element={<Auth />} /> {/* <-- 2. MAKE SURE THIS IS HERE */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;