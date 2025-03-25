import React, { useEffect } from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';
const Profile = () => {

    const { user } = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login")

    }

    return (
        <section className='min-h-screen  flex flex-col'>

            <div className='flex-grow container mx-auto p-4 md:p-6'>
                <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
                    {/* Left */}
                    <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
                        <h1 className='text-2xl md:text-3xl font-bold mb-4 '>{user?.name}</h1>
                        <p className="text-gray-700 mb-4 text-lg">{user?.email}</p>
                        <button className="w-ull bg-blue-whale text-white py-2 px-4 hover:bg-hover-color" onClick={handleLogout}>Logout</button>
                    </div>

                    {/*Right Section */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <MyOrdersPage />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile