


// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchCategories = async () => {
  return await axios.get(`${API_BASE_URL}/products/categories`);
};



export const fetchProductsByCategory = async (category) => {
  const url = category 
    ? `https://fakestoreapi.com/products/category/${category}`
    : 'https://fakestoreapi.com/products';
  return await axios.get(url);
};
