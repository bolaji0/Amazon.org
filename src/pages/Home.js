import React from 'react'
import Banner from '../components/home/Banner'
import Product from '../components/home/Product'

const Home = () => {
  return (
    <div>
      <Banner/>
        <div className='w-full py-10 -mt-14 xl:-mt-36'>
      <Product />
      </div>
    </div>
  )
}

export default Home