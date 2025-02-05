
// src/features/category/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, onSelectCategory }) => (
   <div className="container mx-auto mb-6 flex  justify-between">
        <div  className="flex flex-col space-y-4  py-8 items-start  " >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="px-4 py-2 "
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))
          }
        </div>

        <div className=" pt-8 flex justify-end w-4/5  border-l-2 border-gray-300 pl-6">
          <img className="w-full h-auto object-cover" src="images/hero.png" alt="Hero Image" />
          </div>
      </div>

);

export default CategoryFilter;
