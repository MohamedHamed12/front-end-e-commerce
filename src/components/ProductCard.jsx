// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addItem } from '../store/slices/CartSlice';

const ProductCard = ({ product }) => {
  const  dispatch = useDispatch();

  const handleAddToCart = () => {
    
    dispatch(addItem(product));
  };
  return (
    <div className="group border rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out bg-white">
      <Link to={`/product/${product.id}`} className="block">
        {/* photo_url Section */}
        <div className="relative w-full h-56 flex items-center justify-center mb-4 overflow-hidden bg-gray-100 rounded-xl">
          <img
            src={product.photo_url}
            alt={product.title}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200 ease-in-out"
          />
        </div>

        {/* Title Section */}
        <h3 className="text-base font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Price Section */}
        <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>

        {/* Additional Info (Optional) */}
        <p className="text-sm text-gray-500 mt-1">Free delivery on orders over $25</p>
      </Link>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <button 
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200"
        >
          Add to Cart
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;