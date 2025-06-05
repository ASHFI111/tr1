import React, { useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../../ProjectData/productsData";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const TopProducts = () => {
  const [category, setCategory] = useState("all");
  const [addedItems, setAddedItems] = useState({});
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    // Set this specific item as added
    setAddedItems((prev) => ({
      ...prev,
      [product.id]: true,
    }));
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }, 1000);
  };

  // Filter products based on selected category
  const filteredProducts =
    category === "all"
      ? productsData
      : productsData.filter((item) => item.category.toLowerCase() === category);

  // Unique categories for buttons
  const categories = ["all", "headphones", "earbuds", "earphones", "neckbands"];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center my-6 text-white">
        Top Products
      </h1>

      {/* Category filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded text-sm md:text-base capitalize transition-colors ${
              category === cat
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <Link to={item.path + item.id} className="p-4 flex-grow">
                <img
                  src={item.images[0]}
                  alt={item.brand}
                  className="w-full h-40 object-contain mx-auto hover:scale-105 transition-transform"
                />
              </Link>

              <div className="p-4 border-t border-gray-700">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-red-500">
                      ★
                    </span>
                  ))}
                  <span className="text-gray-400 text-xs ml-1">
                    ({item.ratings})
                  </span>
                </div>
                <Link to={item.path + item.id}>
                  <h4 className="font-semibold text-white mb-1 hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                  <h5 className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {item.info}
                  </h5>
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <p className="font-bold text-white">
                    ₹{item.finalPrice.toLocaleString()}
                  </p>
                  {item.originalPrice && (
                    <del className="text-gray-500 text-sm">
                      ₹{item.originalPrice.toLocaleString()}
                    </del>
                  )}
                </div>
                <button
                  onClick={() => addToCartHandler(item)}
                  disabled={addedItems[item.id]}
                  className={`w-full py-2 px-4 rounded-md transition-colors ${
                    addedItems[item.id]
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {addedItems[item.id] ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
          <Link to="all-products" className="block">
            <div className="flex flex-col justify-center border-2 border-gray-400 rounded p-4 h-96">
              <div className="text-center">
                <h2 className="text-white text-5xl md:text-4xl text-center underline">
                  Browse All Products
                </h2>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No products found in this category</p>
        </div>
      )}
    </div>
  );
};

export default TopProducts;