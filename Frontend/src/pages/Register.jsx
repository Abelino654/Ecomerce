import React, { useEffect, useState } from 'react'
import login from "../assets/hero2.webp";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCarts } from '../redux/slices/cartSlice';
const Register = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId } = useSelector(store => store.auth);
    const { cart } = useSelector(store => store.cart)


    // Redirect parameters
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout")


    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCarts({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/")
                });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/")
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password }));
    }
    return (
        <div className='flex '>
            <div className='w-full md:w-1/2 flex-col justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-md'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>Bazario</h2>

                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>Hey There .</h2>
                    <p className='text-center mb-6'>
                        Enter your username and password to login
                    </p>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your Name'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your email address'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your password'
                        />
                    </div>

                    {/*Button  */}
                    <button type="submit" className='w-full bg-blue-whale text-white p-2 rounded-lg font-semibold hover:bg-hover-color'>
                        Register
                    </button>
                    <p className='mt-6 text-center text-sm'>
                        Don't have an account?
                        <Link to={`login/?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
                            Login
                        </Link>
                    </p>
                </form>
            </div>

            {/*Image  */}
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={login}
                        alt="Login to Account"
                        className='h-[750px] w-full object-cover'
                    />
                </div>
            </div>
        </div>
    )
}

export default Register