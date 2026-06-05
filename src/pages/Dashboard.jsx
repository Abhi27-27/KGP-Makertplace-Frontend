import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [myItems, setMyItems] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  // Dynamically grab the deployed backend URL, just like you did in CreateListing
  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    if (userInfo && userInfo._id) {
      // Fetch ONLY this user's items using the dynamic API_URL
      fetch(`${API_URL}/api/products/user/${userInfo._id}`)
        .then((res) => res.json())
        .then((data) => setMyItems(data))
        .catch((err) => console.error("Error fetching dashboard items:", err));
    }
  }, [userInfo, API_URL]);

  const handleDelete = async (productId) => {
    // Add a confirmation popup so they don't delete by accident!
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const response = await fetch(`${API_URL}/api/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the item from the screen instantly without refreshing
          setMyItems(myItems.filter(item => item._id !== productId));
        } else {
          alert("Failed to delete item.");
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  if (!userInfo) return <div className="text-center mt-20 text-xl font-semibold text-gray-700">Please log in first to view your dashboard.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">My Active Listings</h2>
      
      {myItems.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-600 text-lg">You haven't listed any items for sale yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myItems.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded bg-gray-100 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">📍 {item.location}</p>
                  <span className="text-sm font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-6">
                <span className="text-xl font-extrabold text-gray-900">₹{item.price}</span>
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white px-4 py-2 rounded font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;