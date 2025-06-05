import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { BsFillCartXFill } from "react-icons/bs";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  

  // Calculate order summary values
  const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
  const originalPrice = cartProducts.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const discountPrice = cartProducts.reduce(
    (sum, item) => sum + (item.originalPrice - item.finalPrice) * item.quantity,
    0
  );
  const totalPrice = originalPrice - discountPrice;

  const handleQuantityChange = (index, newQuantity) => {
    dispatch(updateQuantity({ index, newQuantity }));
  };

  const handleRemoveItem = (index) => {
    dispatch(removeFromCart(index));
  };


  return (
    <div className="container mx-auto p-4">
      
      {cartProducts && cartProducts.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-scroll h-screen">
            {cartProducts.map((item, i) => (
              <div className="flex items-start bg-gray-800 rounded-lg p-4 mb-4" key={i}>
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="ml-4 flex-1">
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.category}</p>
                  <h4 className="text-white mt-2">
                    ₹{item.finalPrice}
                    <del className="text-gray-400 ml-2">₹{item.originalPrice}</del>
                  </h4>
                  
                  <div className="flex items-center mt-3">
                    <button 
                      className="bg-gray-700 text-white px-3 py-1 rounded-l"
                      onClick={() => handleQuantityChange(i, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="bg-gray-700 text-white px-4 py-1">
                      {item.quantity}
                    </span>
                    <button 
                      className="bg-gray-700 text-white px-3 py-1 rounded-r"
                      onClick={() => handleQuantityChange(i, item.quantity + 1)}
                    >
                      +
                    </button>
                    
                    <button 
                      className="ml-auto text-red-500 hover:text-red-400"
                      onClick={() => handleRemoveItem(i)}
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="md:w-80 bg-gray-800 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-white mb-4">
              Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-gray-300">Original Price</p>
                <p className="text-white">₹{originalPrice.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-300">Discount</p>
                <p className="text-green-500">-₹{discountPrice.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-300">Delivery</p>
                <p className="text-green-500">Free</p>
              </div>
              
              <div className="border-t border-gray-700 my-3"></div>
              
              <div className="flex justify-between font-bold text-lg">
                <p className="text-white">Total Amount</p>
                <p className="text-white">₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>
            
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg mt-6">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 flex items-center justify-center flex-col">
          <div className="mb-4">
            <h1 className="text-9xl text-red-500"><BsFillCartXFill /></h1>
          </div>
          <p className="text-gray-400 text-xl">Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;