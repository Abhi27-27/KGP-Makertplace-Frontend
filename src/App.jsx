import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { ChatProvider } from './context/ChatContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CreateListing from './pages/CreateListing';
import Auth from './pages/Auth';
import Account from './pages/Dashboard';
import Chat from './pages/Chat';

function App() {
  return (
    <LoadingProvider>
      <ChatProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/20 text-slate-900">
            <LoadingSpinner />
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/sell" element={<CreateListing />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/account" element={<Account />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:conversationId" element={<Chat />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ChatProvider>
    </LoadingProvider>
  );
}

export default App;
