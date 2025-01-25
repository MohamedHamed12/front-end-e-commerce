// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const ProductCard = ({ product }) => {
  return (
 
    <div className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative w-full h-64 bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.title}
          </h3>
          <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
          Add to Cart
        </button>
        <Link
          to={`/product/${product.id}`}
          className="text-blue-500 hover:underline text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
