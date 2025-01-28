
// src/ProjectPage.jsx
import React from 'react';

import ProductDetails from './ProductDetails';

import Carousel from '../components/Carousel';

import { useSelector } from 'react-redux';
function ProjectPage() {
    const products = useSelector((state) => state.products.items);

  return (
    <>
      <ProductDetails  />
      <Carousel products={products} />
    </>
    
  );
}

export default ProjectPage;
