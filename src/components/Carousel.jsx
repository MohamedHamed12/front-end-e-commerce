import React, { useState, useEffect } from 'react';

const Carousel = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Number of products to show per slide based on screen size
  const getProductsPerSlide = () => {
    if (window.innerWidth < 640) return 1; // Mobile
    if (window.innerWidth < 1024) return 2; // Tablet
    return 3; // Desktop
  };

  const [productsPerSlide, setProductsPerSlide] = useState(getProductsPerSlide());

  // Calculate total number of slides
  const totalSlides = Math.ceil(products.length / productsPerSlide);

  // Handle window resize to update products per slide
  useEffect(() => {
    const handleResize = () => {
      setProductsPerSlide(getProductsPerSlide());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [autoPlay, totalSlides]);

  // Get products for the current slide
  const getProductsForSlide = (slideIndex) => {
    const startIndex = slideIndex * productsPerSlide;
    const endIndex = startIndex + productsPerSlide;
    return products.slice(startIndex, endIndex);
  };

  // Go to a specific slide
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="relative w-full bg-gray-100 " role="region" aria-label="Product Carousel">
      <div className="carousel h-80 overflow-hidden ">
        <div
          className="carousel-body h-full flex transition-transform duration-500 ease-in-out "
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="carousel-slide min-w-full px-1 flex items-center justify-center">
              {getProductsForSlide(slideIndex).map((product) => (
                <div key={product.id} className={`w-${100 / productsPerSlide}% p-2`}>
                  <div className="bg-base-200/50 flex h-full justify-center p-6 rounded-lg shadow-md">
                    <div className="self-center text-center">
                      <img
                        src={product.image}
                        alt={product.title.slice(0, 20)}
                        className="w-32 h-32 object-cover mx-auto mt-4 mb-4 rounded-lg"
                      />
                      <h3 className="text-lg font-semibold">{product.title.slice(0, 20)}</h3>
                      <p className="text-md">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Previous Slide */}
      <button
        type="button"
        className="carousel-prev absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)}
        aria-label="Previous Slide"
      >
        <span className="text-xl">{"<"}</span>
      </button>

      {/* Next Slide */}
      <button
        type="button"
        className="carousel-next absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)}
        aria-label="Next Slide"
      >
        <span className="text-xl">{">"}</span>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        onClick={() => setAutoPlay(!autoPlay)}
        aria-label={autoPlay ? 'Pause Auto-play' : 'Start Auto-play'}
      >
        {autoPlay ? '⏸️' : '▶️'}
      </button>
    </div>
  );
};

export default Carousel;