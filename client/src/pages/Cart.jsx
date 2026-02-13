import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../context/AppContext";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, navigate, cartCount, totalCartAmount, cartItems, removeFromCart, updateCartItem, axios, user, setCartItems, addToCart } = useContext(AppContext);

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = []
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        const cartProduct = { ...product, quantity: cartItems[key] };
        tempArray.push(cartProduct);
      }
    }
    setCartArray(tempArray);
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get('/api/address/get', { withCredentials: true });
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getAddress();
    }
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address")
      }

      if (paymentOption === "COD") {
        const { data } = await axios.post('/api/order/cod', {
          userId: user._id,
          items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
          address: selectedAddress._id
        })

        if (data.success) {
          toast.success(data.message)
          setCartItems({})
          navigate('/my-orders')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post('/api/order/stripe', {
          userId: user._id,
          items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
          address: selectedAddress._id
        })

        if (data.success) {
          window.location.replace(data.url)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row py-8 md:py-16 gap-10 max-w-7xl w-full px-4 md:px-6 mx-auto">
      {/* Left Side: Cart Items */}
      <div className='flex-1 animate-in fade-in slide-in-from-left-4 duration-500'>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Shopping Cart
          </h1>
          <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold">
            {cartCount()} Items
          </span>
        </div>

        {cartArray.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center">
            <p className="text-gray-400 text-lg">Your cart is empty.</p>
            <Link to="/products" className="mt-4 bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition">
              Shop Grocery
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartArray.map((product, index) => (
              <div
                key={product._id}
                className="bg-white border border-gray-100 rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product Image */}
                <div
                  onClick={() => {
                    navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-full sm:w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-50 overflow-hidden group"
                >
                  <img className="max-w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    src={product.image[0]}
                    alt={product.name} />
                </div>

                {/* Product Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-gray-900 font-bold text-lg md:text-xl line-clamp-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">{product.category}</p>
                  <p className="text-orange-600 font-bold text-lg mt-1">${product.offerPrice}</p>

                  {/* Quantity & Weight info for mobile */}
                  <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                    <p className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">Weight: {product.weight || "N/A"}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-1">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white rounded-xl transition active:scale-90 font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">{product.quantity}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="w-10 h-10 flex items-center justify-center text-orange-600 hover:bg-white rounded-xl transition active:scale-90 font-bold text-xl"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
                  <div className="text-center sm:text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest hidden sm:block">Subtotal</p>
                    <p className="text-xl font-black text-gray-900">${product.offerPrice * product.quantity}</p>
                  </div>
                  <button
                    onClick={() => updateCartItem(product._id, 0)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-colors active:scale-90"
                    title="Remove"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 font-bold transition-colors mt-8 group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Right Side: Order Summary */}
      <div className="w-full lg:w-[400px] animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-xl shadow-gray-100 sticky top-24">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Delivery Address</p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-orange-600 text-xs font-bold hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div className="relative">
                <p className="text-gray-700 text-sm font-medium leading-relaxed italic line-clamp-2">
                  {selectedAddress
                    ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                    : "Please add a delivery address"}
                </p>

                {showAddress && (
                  <div className="absolute left-0 right-0 top-10 z-50 py-2 bg-white border border-gray-100 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-2">
                    {addresses.map((address, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowAddress(false);
                        }}
                        className="text-gray-600 p-3 hover:bg-orange-50 cursor-pointer text-xs font-medium border-b border-gray-50 last:border-none"
                      >
                        {address.street}, {address.city}, {address.state}
                      </div>
                    ))}
                    <div
                      onClick={() => navigate("/add-address")}
                      className="text-orange-600 text-center font-bold text-xs p-3 hover:bg-orange-50 cursor-pointer"
                    >
                      + Add New Address
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentOption("COD")}
                  className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${paymentOption === "COD" ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-gray-100 bg-white text-gray-400'}`}
                >
                  COD
                </button>
                <button
                  onClick={() => setPaymentOption("Online")}
                  className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${paymentOption === "Online" ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-gray-100 bg-white text-gray-400'}`}
                >
                  Online
                </button>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Price Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>
                <span>${totalCartAmount()}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs mt-1">Free</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Tax (2%)</span>
                <span>${((totalCartAmount() * 2) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                <span className="text-gray-900 font-bold">Total Amount</span>
                <span className="text-3xl font-black text-orange-600">${(totalCartAmount() + (totalCartAmount() * 2) / 100).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={cartArray.length === 0}
              className="w-full py-4 mt-6 bg-orange-600 text-white font-extrabold text-lg rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              {paymentOption === "COD" ? "Place Order" : "Pay with Stripe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;