// FutureProducts.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FutureProducts } from './futureProduct';
import { Link } from 'react-router-dom';

const FutureProductsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const products = [...FutureProducts, ...FutureProducts]; // Duplicate for infinite effect

  const nextSlide = () => {
    setCurrentIndex(prev => {
      const newIndex = prev + 1;
      if (newIndex >= FutureProducts.length) {
        // Immediately jump to the start without animation
        setTimeout(() => {
          sliderRef.current.style.transition = 'none';
          setCurrentIndex(0);
        }, 500);
      }
      sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prev => {
      const newIndex = prev - 1;
      if (newIndex < 0) {
        // Immediately jump to the end without animation
        setTimeout(() => {
          sliderRef.current.style.transition = 'none';
          setCurrentIndex(FutureProducts.length - 1);
        }, 500);
      }
      sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
      return newIndex;
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const handleMouseEnter = () => clearInterval(intervalRef.current);
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(nextSlide, 3000);
  };

  // Calculate which product is centered
  const getCenterIndex = () => {
    return currentIndex % FutureProducts.length;
  };

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-6xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-50">Featured Products</h2>
      
      <div 
        className="relative overflow-hidden h-64 sm:h-80 md:h-96"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Arrow */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black text-gray-50 opacity-0 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all group-hover/slider:opacity-100"
          aria-label="Previous slide"
        >
          &lt;
        </button>

        {/* Slider Container */}
        <div className="flex items-center h-full">
          <div 
            ref={sliderRef}
            className="flex items-end"
            style={{
              transform: `translateX(calc(50% - ${currentIndex * (100 / FutureProducts.length)}%))`,
              width: `${FutureProducts.length * 20}%`
            }}
          >
            {products.map((product, index) => {
              const isCenter = index % FutureProducts.length === getCenterIndex();
              return (
                <div
                  key={`${product.id}-${index}`}
                  className={`flex-shrink-0 px-1 sm:px-2 transition-all duration-300 ${isCenter ? 'scale-110' : 'scale-90 opacity-80'}`}
                  style={{ width: `${100 / FutureProducts.length}%` }}
                >
                  <div className={`rounded-lg p-2 sm:p-4 shadow-md hover:shadow-lg transition-all h-full flex flex-col ${isCenter ? ' border-0' : 'bg-none'}`}>
                    <h3 className={`text-center font-medium text-gray-100 mb-1 sm:mb-2 line-clamp-2 ${isCenter ? 'text-md sm:text-lg' : 'text-sm sm:text-md'}`}>
                      {product.title}
                    </h3>
                    <Link to={`future-products/${product.id}`}>
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className={`w-full mb-2 sm:mb-4 object-contain ${isCenter ? 'h-32 sm:h-48' : 'h-20 sm:h-32'}`}
                      />
                    </Link>
                    <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 mt-auto">
                      <span className="text-white text-sm sm:text-base font-bold">₹{product.originalPrice}</span>
                      <span className="text-gray-500 text-xs sm:text-base line-through">₹{product.finalPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 opacity-0 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all group-hover/slider:opacity-100"
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FutureProductsSlider;