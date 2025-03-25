import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from '../redux/slices/orderSlice';
const MyOrdersPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { orders, loading, error } = useSelector(store => store.order);
    useEffect(() => {

        dispatch(fetchUserOrders());
    }, [dispatch])


    if (loading) {
        return <p className='text-green-500 text-center'>Loading.......</p>
    }
    if (error) {
        return <p className='text-red-500 text-center'>Error{error}</p>
    }
    const handleRowClick = (orderID) => {
        navigate(`/orderDetails/${orderID}`);
    }
    // useEffect(() => {

    //     setTimeout(() => {
    //         // Fake Orders
    //         const mockOrders = [
    //             {
    //                 _id: "12345",
    //                 createdAt: new Date(),
    //                 shippingAddress: { city: "Lahore", country: "Pakistan" },
    //                 orderItems: [
    //                     {
    //                         name: "Product 1",
    //                         image: "https://picsum.photos/500/500?random=1"
    //                     }
    //                 ],
    //                 totalPrice: 100,
    //                 isPaid: true,
    //             },
    //             {
    //                 _id: "2345",
    //                 createdAt: new Date(),
    //                 shippingAddress: { city: "Lahore", country: "Pakistan" },
    //                 orderItems: [
    //                     {
    //                         name: "Product 1",
    //                         image: "https://picsum.photos/500/500?random=1"
    //                     }
    //                 ],
    //                 totalPrice: 100,
    //                 isPaid: false,
    //             },
    //             {
    //                 _id: "1235",
    //                 createdAt: new Date(),
    //                 shippingAddress: { city: "Lahore", country: "Pakistan" },
    //                 orderItems: [
    //                     {
    //                         name: "Product 1",
    //                         image: "https://picsum.photos/500/500?random=1"
    //                     }
    //                 ],
    //                 totalPrice: 100,
    //                 isPaid: true,
    //             }
    //         ]

    //         setOrders(mockOrders)
    //     }, 1000)
    // }, [])
    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-800'>
                        <tr className='bg-gray-100 text-xs uppercase text-gray-900'>
                            <th className="py-2 px-4 sm:py-3 ">Image </th>
                            <th className="py-2 px-4 sm:py-3 ">Order ID</th>
                            <th className="py-2 px-4 sm:py-3 ">Created At</th>
                            <th className="py-2 px-4 sm:py-3 ">Shipping Address</th>
                            <th className="py-2 px-4 sm:py-3 ">Items </th>
                            <th className="py-2 px-4 sm:py-3 ">Price</th>
                            <th className="py-2 px-4 sm:py-3 ">Status</th>
                        </tr>

                    </thead>

                    <tbody>
                        {
                            orders && orders?.length > 0 ? (
                                orders.map((order) => (
                                    <tr onClick={() => handleRowClick(order._id)} key={order?._id} className='border-b hover-border-gray-100 cursor-pointer'>
                                        <td className='py-2 px-2  sm:py-4 sm:px-4'>
                                            <img src={order?.orderItems[0]?.image} alt={order?.orderItems[0]?.name} className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg' />
                                        </td>
                                        <td className=" py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                                            #{order?._id}
                                        </td>
                                        <td className=" py-2 px-2 sm:py-4 sm:px-4 ">
                                            {new Date(order?.createdAt).toLocaleDateString()}{""}
                                            {new Date(order?.createdAt).toLocaleTimeString()}{""}
                                        </td>
                                        <td className=" py-2 px-2 sm:py-4 sm:px-4 ">
                                            {order?.shippingAddress ? `${order?.shippingAddress?.city},${order?.shippingAddress?.country}` : "N/A"}
                                        </td>
                                        <td className=" py-2 px-2 sm:py-4 sm:px-4 ">
                                            {order?.orderItems.length}
                                        </td>
                                        <td className=" py-2 px-2 sm:py-4 sm:px-4 ">
                                            ${order?.totalPrice}
                                        </td>
                                        <td className=" py-2 px-2 sm:py-4 sm:px-4 ">
                                            <span className={`${order.isPaid ? "bg-green-50 text-green-800" : "bg-red-50 text-red-900"} px-2 py-1 text-xs sm:text-sm rounded-md font-medium`}>{order?.isPaid ? "Paid" : "Pending"}</span>
                                        </td>
                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className='py-4 px-4 text-center text-gray-800'>
                                        You haven't placed any orders yet.
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

export default MyOrdersPage