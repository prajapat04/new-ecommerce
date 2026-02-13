import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
      <img src={assets.main_banner_bg} alt="" className="hidden md:block w-full object-cover h-[400px] lg:h-[500px]" />
      <img src={assets.main_banner_bg_sm} alt="" className="md:hidden w-full h-[450px] object-cover" />

      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent md:bg-none flex flex-col items-center md:items-start justify-center px-6 md:px-12 lg:px-24">
        <div className="max-w-md animate-in fade-in slide-in-from-left-4 duration-700">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Freshness You Can <span className="text-orange-600">Trust</span>, Savings You'll Love!
          </h1>
          <p className="mt-4 text-gray-600 text-sm md:text-base lg:text-lg max-w-sm md:max-w-md">
            Get the best quality groceries delivered to your doorstep at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center mt-8 gap-4">
            <Link to="/products" className="w-full sm:w-auto text-center px-8 py-4 bg-orange-600 hover:bg-orange-700 transition-all text-white rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-95">
              Shop Now
            </Link>
            <Link to="/products" className="w-full sm:w-auto text-center px-8 py-4 bg-white hover:bg-gray-50 transition-all text-gray-900 rounded-xl font-bold border border-gray-200 active:scale-95 shadow-sm">
              Explore Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
