import React, { useContext } from 'react'
import { categories } from '../assets/assets'
import { AppContext } from '../context/AppContext'

export const Category = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className='mt-20 md:mt-32 max-w-7xl mx-auto px-4 overflow-hidden'>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
        <div>
          <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block ml-1">Curated Selection</span>
          <h2 className='text-3xl md:text-5xl font-black text-gray-900 tracking-tight'>
            Browse by <span className="text-orange-600">Category</span>
          </h2>
        </div>
        <button onClick={() => navigate('/products')} className="text-sm font-bold text-gray-400 hover:text-orange-600 transition-colors hidden md:block border-b border-transparent hover:border-orange-600 pb-1">
          View All Products →
        </button>
      </div>

      <div className='grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-6'>
        {categories.map((category, index) => (
          <div
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
            key={index}
            className='group cursor-pointer relative flex flex-col items-center justify-center p-6 rounded-[32px] border border-transparent hover:border-white transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200 animate-in fade-in slide-in-from-bottom-8 duration-700 md:bg-inherit'
            style={{
              backgroundColor: typeof window !== 'undefined' && window.innerWidth > 768 ? category.bgColor : 'transparent',
              animationDelay: `${index * 50}ms`
            }}
          >
            {/* Background Accent */}
            <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 rounded-[32px] transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <img src={category.image} alt={category.text} className='w-full h-full object-contain drop-shadow-lg' />
              </div>
              <p className='text-sm md:text-base font-black text-gray-800 tracking-tight group-hover:text-orange-600 transition-colors'>
                {category.text}
              </p>

              {/* Count / Arrow Indicator */}
              <div className="mt-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view all link */}
      <div className="mt-8 md:hidden text-center">
        <button onClick={() => navigate('/products')} className="text-sm font-bold text-orange-600">
          View All Categories →
        </button>
      </div>
    </div>
  )
}
