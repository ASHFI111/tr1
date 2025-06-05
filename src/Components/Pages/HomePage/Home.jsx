import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { SliderData } from "../../ProjectData/SliderData";
import TopProducts from "../TopProducts/TopProducts";
import Advantages from "../AdvantagesPage/Advantages";
import FutureProductsSlider from "../FutureProductsPage/FutureProducts";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === SliderData.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? SliderData.length - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <>
      <div
        className="relative h-screen md:h-[100vh] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Invisible clickable areas for navigation */}
        <div
          onClick={prevSlide}
          className="absolute left-0 top-0 h-full w-[50px] z-10 cursor-pointer"
          aria-label="Previous slide"
        />

        <div
          onClick={nextSlide}
          className="absolute right-0 top-0 h-full w-[50px] z-10 cursor-pointer"
          aria-label="Next slide"
        />

        {/* Slides container */}
        <div
          className="h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SliderData && SliderData.length > 0 ? (
            SliderData.map((item) => (
              <div className="w-full flex-shrink-0 h-full bg-gradient-to-r from-black to-gray-800" key={item.id}>
                <div className="flex flex-col md:flex-row justify-center items-center h-full px-4 md:px-8 lg:px-16">
                  {/* Content container - centered both vertically and horizontally */}
                  <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
                    {/* Text content */}
                    <div className="text-white text-center md:text-left md:w-1/2 md:pr-8 order-2 md:order-1">
                      <h5 className="text-sm md:text-lg pb-1 font-bold">
                        {item.product}
                      </h5>
                      <h1 className="text-2xl md:text-4xl font-bold pb-4">
                        {item.description}
                      </h1>
                      <p className="text-xl md:text-2xl font-bold my-3">
                        ₹{item.discountPrice}{" "}
                        <del className="text-gray-300 pl-2 font-bold">
                          ₹{item.originalPrice}
                        </del>
                      </p>
                      <Link 
                        to={`product-details/${item.id}`} 
                        className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-6 md:py-2 rounded mt-4 transition-colors font-bold"
                      >
                        Shop Now
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mb-8 md:mb-0">
                      <img
                        src={item.path}
                        className="max-h-[40vh] md:max-h-[60vh] lg:max-h-[70vh] object-contain"
                        alt={item.product}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <p>Loading....</p>
            </div>
          )}
        </div>

        {/* Indicator dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
          {SliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 mx-1 rounded-full transition-all ${
                currentIndex === index ? "bg-white w-4" : "bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <dv>
        <FutureProductsSlider />
      </dv>
      <div>
        <TopProducts />
      </div>
      <div>
        <Advantages />
      </div>
    </>
  );
};

export default Home;