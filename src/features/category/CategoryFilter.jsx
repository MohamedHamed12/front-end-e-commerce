
// src/features/category/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, onSelectCategory ,banners}) => (
   <div className="container mx-auto mb-6 flex  justify-between">
        <div  className="flex flex-col space-y-4  py-8 items-start  " >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="px-4 py-2 "
            >
              {category.title.charAt(0).toUpperCase() + category.title.slice(1)}
            </button>
          ))
          }
        </div>

        <div className=" pt-8 flex justify-end w-4/5  border-l-2 border-gray-300 pl-6">
      
      
           {banners.length && <img className="w-full max-h-[400px]  object-cover" src={banners[0].photo_url} alt="Hero Image" />}
          </div>
      </div>

);

export default CategoryFilter;
