import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlice';
const ProductManagement = () => {
    const { products, loading, error } = useSelector(store => store.adminProducts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);


    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAdminProducts());
        }

    }, [dispatch, user, navigate])
    const handleDelete = (id) => {
        if (window?.confirm("Are you sir you want to delete the product?")) {
           
            dispatch(deleteProduct(id));
        }
    }

    if(loading){
        return <p className='text-green-600 text-center'>Loading.......</p>
    }

    if(error){
        return <p className='text-red-900 text-center'>Error {error}</p>
    }
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-6'>Product Management</h2>
            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='min-w-full text-left text-gray-700'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>Price</th>
                            <th className='py-3 px-4'>SKU</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>

                    </thead>

                    <tbody>
                        {
                            products?.length > 0 ? products?.map((product) => {
                             return       <tr className='border-b bg:hover-bg-gray-50 custor-pointer' key={product?._id}>

                                    <td className='p-4 '>
                                        {product?.name}
                                    </td>
                                    <td className='p-4 '>
                                        {product?.price}
                                    </td>
                                    <td className='p-4 '>
                                        {product?.sku}
                                    </td>
                                    <td className='p-4 '>
                                        <Link to={`/admin/products/${product?._id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
                                            Edit
                                        </Link>
                                        <button className='bg-blue-whale text-white px-2 py-1 rounded hover:bg-hover-color' onClick={() => handleDelete(product?._id)}>Delete</button>
                                    </td>
                                </tr>
                            }) : (<tr>
                                <td colSpan={4} className='p-4 text-center text-gray-700'>
                                    No Products Found.
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement