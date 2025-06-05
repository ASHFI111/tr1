import React, { useState } from "react";
import { sortMenu } from "../../ProjectData/filterBarData";
import { brandsMenu } from "../../ProjectData/filterBarData";
import { categoryMenu } from "../../ProjectData/filterBarData";
import { productsData } from "../../ProjectData/productsData";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const AllProducts = () => {
  const [addedProducts, setAddedProducts] = useState({}); // Track added state for each product
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(19990); // Max price by default
  const { id } = useParams();
  const dispatch = useDispatch();

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let filteredProducts = id
      ? productsData.filter((item) => item.id === parseInt(id))
      : [...productsData];

    // Apply brand filters
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(
      (product) => product.finalPrice <= priceRange
    );

    // Apply sorting
    switch (selectedSort) {
      case "Latest":
        filteredProducts.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
        break;
      case "Featured":
        filteredProducts = filteredProducts.filter((product) => product.tag);
        break;
      case "Top Rated":
        filteredProducts.sort((a, b) => b.rateCount - a.rateCount);
        break;
      case "Price: Low to High":
        filteredProducts.sort(
          (a, b) => (a.finalPrice || 0) - (b.finalPrice || 0)
        );
        break;
      case "Price: High to Low":
        filteredProducts.sort(
          (a, b) => (b.finalPrice || 0) - (a.finalPrice || 0)
        );
        break;
      default:
        // No sorting or default sorting
        break;
    }

    return filteredProducts;
  };

  const productsToDisplay = getFilteredProducts();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    // Set this product as added
    setAddedProducts(prev => ({
      ...prev,
      [product.id]: true
    }));
    
    // Reset after 1 second
    setTimeout(() => {
      setAddedProducts(prev => ({
        ...prev,
        [product.id]: false
      }));
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/4 p-4 h-screen">
          <h3 className="font-bold text-white">Sort By</h3>
          <hr className="my-2 bg-slate-400 h-0.5" />

          {sortMenu && sortMenu.length > 0 ? (
            sortMenu.map((sort) => (
              <ul key={sort.id}>
                <li
                  className={`text-slate-200 cursor-pointer hover:text-white ${
                    selectedSort === sort.title ? "font-bold text-white" : ""
                  }`}
                  onClick={() => setSelectedSort(sort.title)}
                >
                  {sort.title}
                </li>
              </ul>
            ))
          ) : (
            <p>Loading....</p>
          )}

          <h3 className="font-bold mt-4 text-white">Filter By</h3>
          <hr className="my-2 bg-slate-400 h-0.5" />

          <h4 className="font-semibold text-white">Brands</h4>
          {brandsMenu && brandsMenu.length > 0 ? (
            brandsMenu.map((filterItems) => (
              <div
                className="flex flex-row items-center my-1"
                key={filterItems.id}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedBrands.includes(filterItems.label)}
                  onChange={() => handleBrandSelect(filterItems.label)}
                />
                <span className="text-slate-200 hover:text-white cursor-pointer">
                  {filterItems.label}
                </span>
              </div>
            ))
          ) : (
            <p className="text-red-400">Loading....</p>
          )}

          <h3 className="font-semibold mt-4 text-white">Category</h3>
          {categoryMenu && categoryMenu.length > 0 ? (
            categoryMenu.map((categoryItems) => (
              <div
                className="flex flex-row items-center my-1"
                key={categoryItems.id}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategories.includes(categoryItems.label)}
                  onChange={() => handleCategorySelect(categoryItems.label)}
                />
                <span className="text-slate-200 hover:text-white cursor-pointer">
                  {categoryItems.label}
                </span>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}

          <h3 className="font-semibold mt-4 text-white">Price</h3>
          <div className="flex items-center my-2">
            <input
              type="range"
              min="449"
              max="19990"
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full accent-red-600"
            />
            <span className="text-white ml-2">₹{priceRange}</span>
          </div>
        </div>

        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-scroll h-screen bg-gray-900 z-10">
          {productsToDisplay && productsToDisplay.length > 0 ? (
            productsToDisplay.map((product) => (
              <div
                key={product.id}
                className="border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <Link to={product.path + product.id}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-2"
                  />
                  <span className="text-red-400">
                    {"★".repeat(product.rateCount)}
                  </span>
                  <h3 className="text-slate-100 font-semibold text-lg mt-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{product.info}</p>
                  <hr className="my-2 border-gray-700" />
                  <h2 className="text-white font-bold">
                    ₹{product.finalPrice}
                    <span className="line-through text-gray-500 ml-2">
                      ₹{product.originalPrice}
                    </span>
                  </h2>
                </Link>
                <button
                  onClick={() => addToCartHandler(product)}
                  className={`${
                    addedProducts[product.id]
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white px-6 py-3 rounded-lg font-medium transition-colors`}
                >
                  {addedProducts[product.id] ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-white text-xl">
                No products found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setPriceRange(19990);
                  setSelectedSort("");
                }}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" 
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;