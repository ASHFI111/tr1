import React, { useState } from "react";
import FutureProducts from "./futureProduct";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import reviewsData from "../../ProjectData/reviewsData";

const FutureProductDetails = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    setIsAddedToCart(true);

    // Reset the button state after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };
  const { id } = useParams();
  const futureProdDetails = FutureProducts.find(
    (item) => item.id === parseInt(id)
  );
  const [mainImage, setMainImage] = useState(
    futureProdDetails?.images[0] || ""
  );
  const [activeTab, setActiveTab] = useState("specifications"); // Default to specifications
  const dispatch = useDispatch();

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-red-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-red-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-red-400" />);
    }

    return stars;
  };

  if (!futureProdDetails) {
    return (
      <div className="text-center py-20">
        <p className="text-center text-red-500 text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="flex items-center text-gray-100 hover:text-gray-300 mb-6 transition-colors"
      >
        <IoMdArrowRoundBack className="mr-2" /> Back to Home
      </Link>

      <div className="bg-black rounded shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Images - Now on left side */}
          <div className="md:w-1/2 p-6 flex">
            {/* Thumbnail images column */}
            <div className="flex flex-col space-y-2 mr-4">
              {futureProdDetails.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${futureProdDetails.title} ${index + 1}`}
                  className="w-24 h-24 object-cover border border-gray-600 rounded cursor-pointer hover:border-red-400 transition-colors"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1">
              <img
                src={mainImage}
                alt={futureProdDetails.title}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6 text-gray-100">
            <div className="mb-4">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {futureProdDetails.tag}
              </span>
              <h1 className="text-3xl font-bold mt-2">
                {futureProdDetails.title}
              </h1>
              <p className="text-gray-300">{futureProdDetails.info}</p>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderRatingStars(futureProdDetails.rateCount)}
              </div>
              <span className="text-gray-300 text-sm">
                ({futureProdDetails.ratings} ratings)
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-white mr-4">
                  ₹{futureProdDetails.finalPrice.toLocaleString()}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₹{futureProdDetails.originalPrice.toLocaleString()}
                </span>
                <span className="ml-4 text-green-400 font-medium">
                  {Math.round(
                    (1 -
                      futureProdDetails.finalPrice /
                        futureProdDetails.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <ul className="space-y-2">
                <li className="flex">
                  <span className="text-gray-400 w-32">Brand</span>
                  <span>{futureProdDetails.brand}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-400 w-32">Category</span>
                  <span>{futureProdDetails.category}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-400 w-32">Type</span>
                  <span>{futureProdDetails.type}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-400 w-32">Connectivity</span>
                  <span>{futureProdDetails.connectivity}</span>
                </li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                className={`${
                  isAddedToCart
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white px-6 py-3 rounded-lg font-medium transition-colors`}
                onClick={() => addToCartHandler(futureProdDetails)}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-t border-gray-700 mt-[30px] w-full">
          <button
            className={`flex-1 px-4 py-3 sm:px-6 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
              activeTab === "specifications"
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("specifications")}
          >
            Specifications
          </button>
          <button
            className={`flex-1 px-4 py-3 sm:px-6 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`flex-1 px-4 py-3 sm:px-6 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
              activeTab === "reviews"
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "specifications" && (
            <div className="text-white space-y-3">
              <h3 className="text-xl font-semibold mb-4 text-red-400">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex">
                  <span className="text-gray-400 w-40">Brand</span>
                  <span className="font-medium">{futureProdDetails.brand}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-40">Model</span>
                  <span className="font-medium">{futureProdDetails.title}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-40">Generic Name</span>
                  <span className="font-medium">
                    {futureProdDetails.category}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-40">Headphones Type</span>
                  <span className="font-medium">{futureProdDetails.type}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-40">Connectivity</span>
                  <span className="font-medium">
                    {futureProdDetails.connectivity}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-40">Microphone</span>
                  <span className="font-medium">Yes</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "overview" && (
            <div className="text-gray-300">
              <h3 className="text-xl font-semibold mb-4 text-red-400">
                Product Overview
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  Experience premium audio quality with the{" "}
                  <span className="font-medium text-white">
                    {futureProdDetails.title}
                  </span>
                  . This{" "}
                  <span className="font-medium text-white">
                    {futureProdDetails.category.toLowerCase()}
                  </span>{" "}
                  features{" "}
                  <span className="font-medium text-white">
                    {futureProdDetails.connectivity.toLowerCase()}
                  </span>{" "}
                  connectivity and{" "}
                  <span className="font-medium text-white">
                    {futureProdDetails.type.toLowerCase()}
                  </span>{" "}
                  design for comfortable wear.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Perfect for{" "}
                  {futureProdDetails.category === "Headphones"
                    ? "immersive listening experiences with crystal-clear sound reproduction."
                    : "on-the-go music lovers who demand both style and substance."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-6 text-red-400">
                Customer Reviews
              </h3>
              {reviewsData && reviewsData.length > 0 ? (
                <div className="space-y-6">
                  {reviewsData.map((review) => (
                    <div
                      className="flex p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                      key={review.id}
                    >
                      <img
                        src={review.url}
                        alt={review.name}
                        className="h-14 w-14 rounded-full mr-4 object-cover border border-gray-700"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-lg">{review.name}</h4>
                          <span className="text-gray-400 text-sm">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center mb-3">
                          {renderRatingStars(5)}
                          <span className="ml-2 text-sm text-gray-400">
                            Verified Purchase
                          </span>
                        </div>
                        <p className="text-gray-300">{review.review}</p>
                        <div className="mt-3 flex space-x-4">
                          <button className="text-sm text-gray-400 hover:text-white">
                            Helpful
                          </button>
                          <button className="text-sm text-gray-400 hover:text-white">
                            Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No reviews available yet</p>
                  <button className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">
                    Be the first to review
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FutureProductDetails;
