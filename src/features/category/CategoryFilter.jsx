
// src/features/category/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, onSelectCategory }) => (
  <div className="flex space-x-4 p-6">
    <button
      onClick={() => onSelectCategory('')}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      All
    </button>
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelectCategory(category)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
