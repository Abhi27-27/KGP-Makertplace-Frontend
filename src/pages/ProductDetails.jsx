import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error)   return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-900 hover:underline mb-6 inline-block">&larr; Back to Listings</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={item.image || 'https://via.placeholder.com/600x400'}
            alt={item.title}
            className="w-full h-auto rounded-lg object-cover bg-gray-100"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase bg-blue-50 px-2 py-1 rounded">
              {item.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{item.title}</h1>
            <p className="text-2xl font-black text-blue-900 mt-2">₹{item.price}</p>
            <p className="text-sm text-gray-500 mt-1">
              📍 Location: <span className="font-semibold">{item.location}</span>
            </p>

            <div className="border-t my-4 pt-4">
              <h3 className="font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600 mt-1 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-bold text-gray-800">Seller Information</h4>
            {/* seller is populated from User model via .populate() in the backend */}
            <p className="text-sm text-gray-600 mt-1">Name: {item.seller?.name}</p>
            <p className="text-sm text-gray-600">Email: {item.seller?.email}</p>
            <a
              href={`mailto:${item.seller?.email}`}
              className="block w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-4 rounded transition-colors text-center"
            >
              Chat with Seller
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;