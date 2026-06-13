import React from 'react';
import { useLoading } from '../context/LoadingContext';

function LoadingSpinner() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-3 bg-white rounded-2xl px-8 py-6 shadow-xl">
        <div className="w-10 h-10 border-4 border-brand-100 border-t-brand-900 rounded-full spinner" />
        <p className="text-sm font-medium text-slate-600">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
