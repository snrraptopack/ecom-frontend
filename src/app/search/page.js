"use client";
import { useState } from 'react';
import Layout from "@/app/component/Layout";
import Link from 'next/link';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    try {
      const response = await fetch(`http://localhost:5001/api/products/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
    setSearching(false);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 xl:w-[200px]"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      {searching ? (
        <p>Searching...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description.substring(0, 100)}...</p>
                <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                <Link href={`/product/${product._id}`}>
                  <span className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View Details
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
