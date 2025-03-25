import React from 'react'
import { Link } from "react-router-dom"

const ProductGrid = ({ products, loading, error }) => {
    if (loading) {
        return <p className='text-green-400 text-center'>Loading ....</p>
    }
    if (error) {
        return <p className='text-red-400 text-center'>Error</p>
    }
    if (!products || !Array.isArray(products) || products.length === 0) {
        return <p className='text-gray-400 text-center'>No products found</p>
    }

    return (
        <div className='similar-products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
                products.map((product, index) => (
                    <Link to={`/product/${product?._id}`} key={index} className='block'>
                        <div className='bg-white p-4 rounded-lg'>
                            <div className='w-full h-96 mb-4'>
                                <img src={product?.images[0]?.url}
                                    alt={product?.images[0]?.alt || product?.name}
                                    className='w-full h-full object-cover rounded-lg'
                                />
                                <h3 className='text-sm mb-2'>{product?.name}</h3>
                                <p className='tracking-tighter text-sm font-medium text-gray-600'>{product?.price}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default ProductGrid