

// src/components/Carousel.jsx
import React, { useEffect, useRef, useState } from 'react';

const Carousel = ({ products }) => {
  const carouselRef = useRef(null);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  // Auto-scroll with direction switching
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        // Adjust scroll based on direction
        carouselRef.current.scrollLeft += direction;

        // Check if it reached the start or end of the scroll area
        const maxScrollLeft = 
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

        if (carouselRef.current.scrollLeft >= maxScrollLeft) {
          setDirection(-1); // Change direction to left
        } else if (carouselRef.current.scrollLeft <= 0) {
          setDirection(1); // Change direction to right
        }
      }
    }, 20); // Adjust the interval for speed

    return () => clearInterval(scrollInterval);
  }, [direction]);

  return (
    <div className="bg-gray-100 p-6 mb-6">
      <h2 className="text-xl font-bold">Best Sellers</h2>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-4 mt-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-48 flex-shrink-0 bg-white border p-4 rounded-md shadow-sm"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-32 w-full object-contain"
            />
            <h3 className="text-md font-bold mt-2">{product.title}</h3>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
