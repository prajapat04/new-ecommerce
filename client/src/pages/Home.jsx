import React from 'react'
import { Hero } from '../components/Hero'
import { Category } from '../components/Category'
import { BestSeller } from '../components/BestSeller'
import NewsLatter from '../components/NewsLatter'

export const Home = () => {
  return (
    <div className='mt-6 md:mt-10 flex flex-col gap-12 md:gap-20 mb-20'>
      <Hero />
      <Category />
      <BestSeller />
      <NewsLatter />
    </div>
  )
}
