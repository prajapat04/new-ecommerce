import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCart from '../components/ProductCart';

const Products = () => {
  const { products, searchQuery } = useContext(AppContext);
  const [filterdProducts, setFilterdProducts] = useState([]);
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterdProducts(
        products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilterdProducts(products);
    }
  }, [products, searchQuery]);
  return (
    <div className='mt-8 md:mt-12 bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm'>
      <h1 className='text-2xl md:text-4xl font-extrabold text-gray-900'>All Products</h1>
      <p className='text-gray-500 mt-2 text-sm md:text-base'>Discover our fresh and healthy products.</p>

      <div className='my-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
        {
          filterdProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCart key={index} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default Products