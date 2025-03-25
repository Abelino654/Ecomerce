import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from '../redux/slices/cartSlice';
const OrderConfirmationPage = () => {

    const dispatch = useDispatch();
    const { checkout } = useSelector(store => store.checkout);
    const navigate = useNavigate();
    const calculateEstimatedDelivery = (time) => {
        const orderDate = new Date(time);
        orderDate.setDate(orderDate.getDate() + 12);
        return orderDate.toLocaleDateString();
    }



    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart  ());
            localStorage.removeItem("cart")
        } else {
            navigate("/my-orders")
        }
    }, [dispatch, checkout, navigate])
    return (
        <div className='max-w-4xl mx-auto p-6 bg-white'>
            <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8 '>
                Thank You for your order!
            </h1>
            {checkout && (
                <div className='p-6 rounded-lg border-r'>
                    <div className='flex justify-between mb-20'>

                        <div>
                            <h2 className='text-xl font-semibold'>
                                Order ID: {checkout?.id}
                            </h2>

                            <p className='text-gray-700'>
                                Order date:{new Date(checkout?.createdAt)?.toLocaleDateString()}
                            </p>
                        </div>
                        {/*Estimated delivery  */}
                        <div >
                            <p className='text-emerald text-sm'>
                                Estimated Delivery:{calculateEstimatedDelivery(checkout?.createdAt)}
                            </p>
                        </div>
                    </div>
                    {/*Items  */}
                    <div className='mb-20'>
                        {checkout?.checkoutItems?.map((item) => {
                          return   <div key={item?.productID} className='flex items-center mb-4'>
                                <img src={item?.image}
                                    alt={item?.name}
                                    className='w-16 h-16 object-cover rounded-md  mr-4'
                                />
                                <div >
                                    <h4 className='text-md font-semibold'>{item?.name}</h4>
                                    <p className='text-sm text-gray-700'>{item?.color} || {item?.size}</p>
                                </div>
                                <div className='ml-auto text-right'>
                                    <p className='text-md '>${item?.price}</p>
                                    <p className="text-sm text-gray-700">Qty:{item?.quantity}</p>
                                </div>
                            </div>

                        })}
                    </div>


                    <div className='grid grid-cols-2 gap-8'>
                        {/*Payment Info  */}
                        <div >
                            <h4 className="text-lg font-semibold mb-2">Payment</h4>
                            <p className="text-gray-800">PayPal</p>
                        </div>

                        {/*Delivery info  */}
                        <div >
                            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                            <p className=" text-gray-800">
                                {checkout?.shippingAddress?.address}
                            </p>
                            <p className=" text-gray-800">
                                {checkout?.shippingAddress?.city},{checkout?.shippingAddress?.country}
                            </p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default OrderConfirmationPage