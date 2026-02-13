import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const ProductCart = ({ product }) => {
  const { navigate, addToCart, cartItems, removeFromCart } = useContext(AppContext)
  const discount = product.price > product.offerPrice ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;

  return product && (
    <div
      onClick={() => {
        navigate(`/product/${product.category.toLowerCase()}/${product?._id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group relative border border-gray-100 rounded-2xl p-4 bg-white hover:shadow-xl hover:border-orange-100 transition-all duration-300 cursor-pointer flex flex-col gap-3 h-full"
    >
      {/* Sale Badge */}
      {discount > 0 && (
        <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
          -{discount}% OFF
        </span>
      )}

      {/* Image Container */}
      <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden group-hover:bg-orange-50/30 transition-colors">
        <img
          className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow gap-1">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{product.category}</p>
        <h3 className="text-gray-800 font-semibold text-base line-clamp-2 leading-tight h-10 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}

        {/* Footer: Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-orange-600">${product.offerPrice}</span>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through">${product.price}</span>
            )}
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            {!cartItems?.[product._id] ? (
              <button
                className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-xl transition-all shadow-md active:scale-95 group/btn"
                onClick={() => addToCart(product._id)}
                aria-label="Add to cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5v14" />
                </svg>
              </button>
            ) : (
              <div className="flex items-center bg-orange-50 rounded-xl border border-orange-100 p-1 shadow-sm">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-7 h-7 flex items-center justify-center text-orange-600 hover:bg-white rounded-lg transition active:scale-90 font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-bold text-orange-700">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="w-7 h-7 flex items-center justify-center text-orange-600 hover:bg-white rounded-lg transition active:scale-90 font-bold"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart