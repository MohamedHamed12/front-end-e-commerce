
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../features/category/CategoryFilter';
import { getCategories } from '../store/slices/categorySlice';
import { fetchProductsByCategory } from '../store/slices/productSlice';
import Carousel from '../components/Carousel';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.list);
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Fetch products when the selected category changes
  useEffect(() => {
    dispatch(fetchProductsByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  return (
    <div>
      <Navbar />
      <CategoryFilter categories={categories} onSelectCategory={setSelectedCategory} />
      {/* <Carousel products={products.slice(0, 5)} /> Show the first 5 products in carousel */}

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div> 
    </div>
  );
};

export default HomePage;
