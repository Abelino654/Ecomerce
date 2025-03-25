import React from 'react'
import { HiShoppingBag, HiOutlineCreditCard } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

const FeaturedSection = () => {
    return (
        <section className='featured-section py-16 px-4 bg-white'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
                {/* Featured 1 */}
                <div className='flex flex-col items-center'>
                    <div className='p-x rounded-full  mb-4'>
                        <HiShoppingBag className="text-xl" />
                    </div>
                    <h4 className='tracking-tighter mb-2 uppercase'>Enjoy Free International Shipping!</h4>
                    <p className='text-gray-600 text-sm tracking-tighter'>
                    Free shipping on orders over $50!
                    </p>
                </div>
                {/* Featured 2 */}
                <div className='flex flex-col items-center'>
                    <div className='p-x rounded-full  mb-4'>
                        <FaArrowRight className="text-xl" />
                    </div>
                    <h4 className='tracking-tighter mb-2  uppercase'>45-Day Hassle-Free Returns!</h4>
                    <p className='text-gray-600 text-sm tracking-tighter'>
                    100% Money-Back Guarantee!
                    </p>
                </div>
                {/* Featured 3 */}
                <div className='flex flex-col items-center'>
                    <div className='p-x rounded-full  mb-4'>
                        <HiOutlineCreditCard className="text-xl" />
                    </div>
                    <h4 className='tracking-tighter mb-2 uppercase'>Safe & Secure Checkout!</h4>
                    <p className='text-gray-600 text-sm tracking-tighter'>
                    100% Secure Checkout Process!
                    </p>
                </div>
            </div>
        </section>
    )
}

export default FeaturedSection