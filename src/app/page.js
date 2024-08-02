"use client";

import { useState, useEffect } from 'react';
import Layout from "@/app/component/Layout";
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map(product => (
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
