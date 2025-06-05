import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderData } from "./SliderData";

const SliderPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Products</h2>
        
        {/* Add this wrapper div with proper styling */}
        <div className="slider-wrapper" style={{ padding: "0 15px" }}>
          <Slider {...settings}>
            {SliderData.map((slide) => (
              <div key={slide.id} className="px-2 focus:outline-none">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full mx-2">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <img 
                        src={slide.path} 
                        alt={slide.product} 
                        className="w-full h-48 object-contain mx-auto mb-4"
                      />
                      <h3 className="text-xl font-semibold text-white mb-2 text-center">
                        {slide.product}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 text-center">
                        {slide.description}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex justify-center items-center gap-4 mb-4">
                        <span className="text-red-500 font-bold text-lg">
                          ₹{slide.discountPrice}
                        </span>
                        <span className="text-gray-500 line-through text-sm">
                          ₹{slide.originalPrice}
                        </span>
                      </div>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderPage;