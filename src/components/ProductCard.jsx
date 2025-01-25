
// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

  return (
    <div className="border rounded p-4">
      
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
