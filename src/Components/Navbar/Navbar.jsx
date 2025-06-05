import React, { useState, useEffect } from "react";
import { BsCart, BsSearch, BsPerson, BsX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import productsData from "../ProjectData/productsData"; // Import your products data
import { useSelector } from "react-redux";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [authPopup, setAuthPopup] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const cartItemsCount = useSelector((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  const closeAuthPopup = () => setAuthPopup(null);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = productsData.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Handle product selection from search results
  const handleProductSelect = (productId) => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchActive(false);
    setMobileSearchVisible(false);
    navigate(`/product-details/${productId}`);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleProductSelect(searchResults[0].id);
    }
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo - responsive sizing */}
          <Link to="/" className="text-xl sm:text-2xl font-bold relative group">
            <span className="text-white">TECH</span>
            <span className="font-light text-gray-300">SHOP</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Navigation - shows on md screens and up */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Search */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredItem("search")}
              onMouseLeave={() => !searchActive && setHoveredItem(null)}
            >
              <button
                className="p-2 rounded-full hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-gray-500 hover:shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                onClick={() => setSearchActive(!searchActive)}
              >
                <BsSearch className="text-lg lg:text-xl" />
              </button>

              {(hoveredItem === "search" || searchActive) && (
                <div
                  className="absolute top-full right-0 mt-2 min-w-[280px] sm:min-w-96 bg-gray-900 rounded-lg shadow-xl p-2 animate-fadeIn"
                  onMouseEnter={() => setHoveredItem("search")}
                  onMouseLeave={() => !searchActive && setHoveredItem(null)}
                >
                  <form onSubmit={handleSearchSubmit}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-gray-800 text-white px-3 py-1 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-r-lg transition-colors duration-200"
                      >
                        <BsSearch />
                      </button>
                    </div>
                  </form>

                  {/* Search results dropdown */}
                  {searchResults.length > 0 && (
                    <div className="mt-2 max-h-60 overflow-y-auto">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="p-2 hover:bg-gray-800 cursor-pointer rounded-md transition-colors"
                          onClick={() => handleProductSelect(product.id)}
                        >
                          <div className="font-medium text-sm sm:text-base">
                            {product.title}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">
                            {product.brand}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchQuery && searchResults.length === 0 && (
                    <div className="mt-2 p-2 text-gray-400 text-xs sm:text-sm">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredItem("cart")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link to="/cart" className="block">
                <div className="p-2 rounded-full hover:bg-gray-900 transition-all duration-200 group relative">
                  <BsCart className="text-lg lg:text-xl group-hover:animate-bounce" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Link>

              {hoveredItem === "cart" && (
                <div className="absolute top-full right-0 mt-2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap animate-fadeIn">
                  Your Cart
                </div>
              )}
            </div>

            {/* User */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredItem("user")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="p-2 rounded-full hover:bg-gray-900 transition-all duration-200 group">
                <BsPerson className="text-lg lg:text-xl group-hover:text-red-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>

              {hoveredItem === "user" && (
                <div className="absolute top-full right-0 mt-2 text-white px-3 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap animate-fadeIn">
                  <div className="flex flex-col space-x-2 border border-gray-500 px-4 rounded">
                    <h2 className="text-slate-300 text-lg mb-1">Hello</h2>
                    <p className="text-slate-300 mb-3">Access Acount Manage Orders</p>
                    <div className="border-2 border-slate-300  my-2 text-center py-2">
                      <button
                      onClick={() => setAuthPopup("login")}
                      className="hover:text-gray-50 transition-colors duration-200 text-xs sm:text-sm cursor-pointer"
                    >
                      Login
                    </button>
                    <span>/</span>
                    <button
                      onClick={() => setAuthPopup("signup")}
                      className="hover:text-gray-50 transition-colors duration-200 text-xs sm:text-sm cursor-pointer"
                    >
                      Signup
                    </button>
                    </div>
                    <hr className="bg-gray-300 h-[1px] w-full mb-2"/>
                    <p className="text-slate-300 mb-3">Please Login</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu - shows on screens smaller than md */}
          <div className="md:hidden flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => {
                setMobileSearchVisible(!mobileSearchVisible);
                if (!mobileSearchVisible) {
                  setTimeout(
                    () =>
                      document.querySelector(".mobile-search-input")?.focus(),
                    0
                  );
                }
              }}
              className="p-1 sm:p-2 hover:text-red-400 transition-colors"
            >
              <BsSearch className="text-lg sm:text-xl" />
            </button>
            <Link
              to="/cart"
              className="p-1 sm:p-2 relative hover:text-red-400 transition-colors"
            >
              <BsCart className="text-lg sm:text-xl" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setAuthPopup("login")}
              className="p-1 sm:p-2 hover:text-red-400 transition-colors"
            >
              <BsPerson className="text-lg sm:text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchVisible && (
          <div className="md:hidden py-2 sm:py-3 animate-slideDown">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="mobile-search-input text-white px-3 py-1 sm:py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 sm:py-2 rounded-r-lg transition-colors"
                >
                  <BsSearch />
                </button>
              </div>
            </form>

            {/* Mobile search results */}
            {searchResults.length > 0 && (
              <div className="mt-2 max-h-60 overflow-y-auto bg-gray-900 rounded-lg">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 sm:p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleProductSelect(product.id)}
                  >
                    <div className="font-medium text-sm sm:text-base">
                      {product.title}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      {product.brand}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="mt-2 p-2 sm:p-3 text-gray-400 text-xs sm:text-sm bg-gray-900 rounded-lg">
                No products found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Auth Popup - responsive sizing */}
      {authPopup && (
        <div className="fixed inset-0  bg-opacity-0 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-800 p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-bold">
                {authPopup === "login" ? "Login" : "Sign Up"}
              </h3>
              <button
                onClick={closeAuthPopup}
                className="text-gray-400 hover:text-white"
              >
                <BsX className="text-xl sm:text-2xl" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {authPopup === "login" ? (
                <form>
                  <div className="mb-3 sm:mb-4">
                    <label className="block text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-gray-800 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-gray-800 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-1 sm:py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    Login
                  </button>
                </form>
              ) : (
                <form>
                  <div className="mb-3 sm:mb-4">
                    <label className="block text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-800 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <label className="block text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-gray-800 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <label className="block text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-gray-800 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-gray-800 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-1 sm:py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                  >
                    Create Account
                  </button>
                </form>
              )}

              <div className="mt-3 sm:mt-4 text-center text-gray-400 text-xs sm:text-sm">
                {authPopup === "login" ? (
                  <p>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setAuthPopup("signup")}
                      className="text-slate-50 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      onClick={() => setAuthPopup("login")}
                      className="text-slate-50 hover:underline"
                    >
                      Login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
