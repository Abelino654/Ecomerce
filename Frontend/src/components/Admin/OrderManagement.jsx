import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { fetchAllOrders, updateOrderDelivery } from '../../redux/slices/adminOrderSlice';
const OrderManagement = () => {
    const { orders, loading, error } = useSelector(store => store.adminOrder);
    const { user } = useSelector(store => store.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, navigate, user])

    const handleStatusChange = (orderId, status) => {
    
        dispatch(updateOrderDelivery({ id: orderId, status }))
    }

    if (loading) {
        return <p className='text-green-600 text-center'>Loading..........</p>
    }

    if (error) {

        return <p className='text-red-900 text-center'>Error {error}</p>
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-6'>Order Management</h2>

            <div className='overflow-x-auto shadow-md sm:rounded-lg'>

                <table className='min-w-full text-left text-gray-700'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-900'>

                        <tr>
                            <th className='py-3 px-4'>Order ID</th>
                            <th className='py-3 px-4'>Customer</th>
                            <th className='py-3 px-4'>Total Price</th>
                            <th className='py-3 px-4'>Status</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {

                            orders?.length > 0 ? (orders?.map((order) => {
                             
                             return   <tr key={order?._id} className='border-b hover:bg-gray-50 cursor-pointer '>
                                    <td className='py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>
                                        #{order?._id}

                                    </td>
                                    <td className='p-4'>{order?.userId?.name}</td>
                                    <td className='p-4'>{order?.totalPrice}</td>
                                    <td className='p-4'>
                                        <select onChange={(e) => {
                                            handleStatusChange(order?._id, e?.target?.value);
                                        }} value={order?.status} className='bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-600 block p-2.5'>

                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>

                                    <td className='p-4'>
                                        <button onClick={() => {
                                            handleStatusChange(order?._id, "delivered");
                                        }}
                                            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-500"
                                        >
                                            Mark as Delivered
                                        </button>
                                    </td>
                                </tr>
                            })) : (
                                <tr>
                                    <td colSpan={5} className='p-4 text-center text-gray-600'>
                                        No Orders Found.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderManagement