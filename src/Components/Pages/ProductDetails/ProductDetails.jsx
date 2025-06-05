import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../../ProjectData/productsData";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import reviewsData from "../../ProjectData/reviewsData";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("specifications");

  const dispatch = useDispatch();

  // Find the product with the matching ID
  const product = productsData.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-white text-center text-4xl mt-8">
        Product not found
      </div>
    );
  }

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const cartHandler = (product) => {
    dispatch(addToCart(product));
    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };
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
  return (
    <div className="text-white p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8">
        {/* Thumbnail Images - Left Side */}
        <div className="flex md:flex-col gap-2 order-1 md:order-none">
          {product.images.map((img, index) => (
            <div
              key={index}
              className={`rounded p-1 cursor-pointer ${
                currentImageIndex === index ? "border-2 border-gray-300" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={img}
                alt={`${product.title} ${index}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Main Image and Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 order-2 md:order-none">
          {/* Main Product Image */}
          <div className="rounded-lg p-4">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-400 mb-4">{product.info}</p>

            <div className="flex items-center mb-4">
              <span className="text-red-400 mr-2">★★★★★</span>
              <span>({product.ratings} reviews)</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold">
                ₹{product.finalPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through ml-2">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-green-500 ml-2">
                  {Math.round(
                    (1 - product.finalPrice / product.originalPrice) * 100
                  )}
                  % off
                </span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Product Details</h3>
              <ul className="space-y-1">
                <li>
                  <span className="text-gray-400">Brand:</span> {product.brand}
                </li>
                <li>
                  <span className="text-gray-400">Category:</span>{" "}
                  {product.category}
                </li>
                <li>
                  <span className="text-gray-400">Type:</span> {product.type}
                </li>
                <li>
                  <span className="text-gray-400">Connectivity:</span>{" "}
                  {product.connectivity}
                </li>
              </ul>
            </div>

            <button
              className={`${
                isAddedToCart
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white px-6 py-3 rounded-lg font-medium transition-colors`}
              onClick={() => cartHandler(product)}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Tagline if exists */}
      {product.tagline && (
        <div className="mt-12 text-center text-xl italic text-gray-300">
          "{product.tagline}"
        </div>
      )}

      <div className="flex border-t border-gray-700 mt-[30px] overflow-x-auto">
        <button
          className={`px-4 py-2 sm:px-6 sm:py-3 font-medium transition-colors whitespace-nowrap ${
            activeTab === "specifications"
              ? "bg-red-600 text-white"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => setActiveTab("specifications")}
        >
          Specifications
        </button>
        <button
          className={`px-4 py-2 sm:px-6 sm:py-3 font-medium transition-colors whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-red-600 text-white"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 sm:px-6 sm:py-3 font-medium transition-colors whitespace-nowrap ${
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
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-40">Model</span>
                <span className="font-medium">{product.title}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-40">Generic Name</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-40">Headphones Type</span>
                <span className="font-medium">{product.type}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-40">Connectivity</span>
                <span className="font-medium">{product.connectivity}</span>
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
                <span className="font-medium text-white">{product.title}</span>.
                This{" "}
                <span className="font-medium text-white">
                  {product.category.toLowerCase()}
                </span>{" "}
                features{" "}
                <span className="font-medium text-white">
                  {product.connectivity.toLowerCase()}
                </span>{" "}
                connectivity and{" "}
                <span className="font-medium text-white">
                  {product.type.toLowerCase()}
                </span>{" "}
                design for comfortable wear.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Perfect for{" "}
                {product.category === "Headphones"
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
  );
};

export default ProductDetails;
