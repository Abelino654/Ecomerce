import React from 'react'
import menCollectionImage from "../../assets/mens.webp";
import womenCollectionImage from "../../assets/women.webp";
import { Link } from 'react-router-dom';
const GenderCollection = () => {
    return (
        <section className='py-16 px-4 lg:px-0  flex justify-center '>
            <div className='container mx-auto max-w-screen-xl  flex flex-col     md:flex-row gap-8 '>
                {/* Women Collection */}
                <div className='relative flex-1'>
                    <img src={womenCollectionImage} alt="women collections" className='w-full h-[700px] object-cover' />



                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-950 mb-6'>
                            Woman's Collection
                        </h2>
                        <Link to="/collections/all?gender=women" className="text-gray-900 underline">

                            Shop Now
                        </Link>
                    </div>
                </div>
                {/* Men Collection */}
                <div className='relative flex-1'>
                    <img src={menCollectionImage} alt="women collections" className='w-full h-[700px] object-cover' />



                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-950 mb-6'>
                            Man's Collection
                        </h2>
                        <Link to="/collections/all?gender=men" className="text-gray-900 underline">

                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GenderCollection