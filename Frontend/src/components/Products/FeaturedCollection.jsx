import React from 'react'
import featured from "../../assets/hero2.webp";
import { Link } from 'react-router-dom';
const FeaturedCollection = () => {
  return (
    <section className="Featured-Section py-16 px-4 lg:px-0" >
      <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
        {/* Left Content */}
        <div className='lg:w-1/2 p-8 text-center lg:text-left'>
          <h2 className='text-lg font-semibold text-gray-700 mb-2'>
            Effortless Comfort, Timeless Style
          </h2>
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Everyday Fashion, Redefined.
          </h2>

          <p className='text-lg text-gray-600 mb-6'>
            Experience premium comfort and style with clothing that seamlessly blends fashion and function—designed to make you look and feel your best every day.
          </p>
          <Link to="/collections/all" className='bg-blue-whale text-white px-6 py-3 rounded-lg text-lg hover:bg-hover-color'>
            Start Shopping
          </Link>
        </div>

        {/* Right content */}
        <div className='lg:w-1/2'>
          <img src={featured}
            alt="Featured Collection"
            className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'
          />

        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection