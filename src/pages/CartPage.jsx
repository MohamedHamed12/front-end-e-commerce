
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CartPage = () => {
  let sampleItem = {
    id: 1,
    product_id: 1,
    user_id: 2,
    price: 399.84,
    status: "active",
    quantity: 5,
    amount: 1999.2,
    name: "Laptop",
  };

  const [cartItems, setCartItems] = useState(Array(5).fill(sampleItem));
  const [couponCode, setCouponCode] = useState("");

  // Function to update quantity
  const updateQuantity = (index, change) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
    updatedCart[index].amount = updatedCart[index].quantity * updatedCart[index].price;
    setCartItems(updatedCart);
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.amount, 0);
  const shipping = totalAmount > 0 ? 10.0 : 0;
  const grandTotal = totalAmount + shipping;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Cart</h1>

          <div className="bg-white shadow-xl rounded-lg p-6">
            {/* Table Header */}
            {cartItems.length > 0 && (
              <div className="hidden md:grid grid-cols-5 gap-4 mb-4 text-gray-700 font-semibold border-b pb-2">
                <h2 className="text-left">Product</h2>
                <h2 className="text-center">Price</h2>
                <h2 className="text-center">Quantity</h2>
                <h2 className="text-center">Amount</h2>
                <h2 className="text-center">Actions</h2>
              </div>
            )}

            {/* Empty Cart Message */}
            {cartItems.length === 0 ? (
              <div className="text-center text-xl text-gray-600 py-8">
                Your cart is empty.
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-5 gap-4 items-center border-b py-4">
                  {/* Product Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  </div>

                  {/* Price */}
                  <p className="text-gray-800 text-center">${item.price.toFixed(2)}</p>

                  {/* Quantity Editor */}
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-12 text-center border border-gray-300 rounded"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Amount */}
                  <p className="text-gray-800 text-center font-semibold">${item.amount.toFixed(2)}</p>

                  {/* Remove Item Button */}
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => setCartItems(cartItems.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
 {/* Action Buttons */}
          <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 px-4">
            <Link
              to="/"
              className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Return to Home
            </Link>

            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Cart
            </button>

          
          </div>
          {/* Coupon Code & Order Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coupon Code Box */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
              <div className="flex">
                <input
                  type="text"
                  className="border border-gray-300 px-4 py-2 rounded-l w-full"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700">
                  Apply
                </button>
              </div>
            </div>

            {/* Total Summary Box */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div> 
              <div className="mt-4 flex justify-center">
               <Link
              to="/checkout"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Proceed to Checkout
            </Link>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
};

export default CartPage;
