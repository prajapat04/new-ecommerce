import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCart from '../components/ProductCart';

export const ProductCategory = () => {
  const { products, navigate } = useContext(AppContext);
  const { category } = useParams();

  const searchCategory = categories.find((item) => item.path.toLowerCase() === category.toLowerCase());

  const filterProduct = products.filter((product) =>
    product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className='mt-8 md:mt-12 mb-20 max-w-7xl mx-auto px-4'>
      {/* Breadcrumbs & Header */}
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-orange-600 transition-colors">Categories</Link>
          <span>/</span>
          <span className="text-orange-600">{searchCategory?.text || category}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className='text-3xl md:text-5xl font-black text-gray-900 tracking-tight'>
              {searchCategory?.text || category.toUpperCase()}
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Discover our fresh collection of {searchCategory?.text?.toLowerCase() || 'products'}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Items</span>
            <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-black border border-orange-200 shadow-sm">
              {filterProduct.length}
            </span>
          </div>
        </div>
      </div>

      {filterProduct.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700'>
          {filterProduct.map((product, index) => (
            <div key={product._id} className="animate-in fade-in zoom-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
              <ProductCart product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-32 bg-gray-50 rounded-[40px] border border-gray-100 animate-in fade-in zoom-in duration-500'>
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className='text-2xl font-black text-gray-900 mb-2'>No Products Found</h2>
          <p className="text-gray-500 font-medium mb-8">We couldn't find any products in this category at the moment.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95"
          >
            Browse Other Categories
          </button>
        </div>
      )}
    </div>
  )
}
