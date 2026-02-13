import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCart from './ProductCart';
import { Link } from 'react-router-dom';

export const BestSeller = () => {
  const { products } = useContext(AppContext);

  return (
    <div className='mt-16 md:mt-24'>
      <div className='flex items-center justify-between mb-8 px-2'>
        <div>
          <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>Best Sellers</h2>
          <p className='text-gray-500 mt-2 text-sm md:text-base'>Most loved products by our customers.</p>
        </div>
        <Link to="/products" className='hidden sm:block text-orange-600 font-bold hover:text-orange-700 transition-colors underline-offset-4 hover:underline'>
          View All →
        </Link>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
        {
          products.filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <ProductCart key={index} product={product} />
            ))
        }
      </div>

      <div className='mt-8 sm:hidden px-2'>
        <Link to="/products" className='block w-full text-center py-3 bg-gray-50 text-orange-600 font-bold rounded-xl border border-orange-100'>
          View All Products
        </Link>
      </div>
    </div>
  )
}