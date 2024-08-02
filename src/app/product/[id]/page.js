"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from "@/app/component/Layout";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5001/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
          setProduct(data);
          console.log(data.image)
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <Layout><p>Loading product...</p></Layout>;
  }

  if (!product) {
    return <Layout><p>Product not found</p></Layout>;
  }

  return (
    <Layout>
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </Layout>
  );
}
