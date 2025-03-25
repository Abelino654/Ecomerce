import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutID, setCheckoutID] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    const { cart, loading, error } = useSelector((store) => store.cart);


    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    })
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            try {
            

                // First, create the checkout in your backend
                const checkoutResponse = await dispatch(
                    createCheckout({
                        checkoutItems: cart.products,
                        shippingAddress,
                        paymentMethod: "Stripe",
                        totalPrice: cart.totalPrice,
                    })
                ).unwrap();

                

                if (checkoutResponse && checkoutResponse.checkout && checkoutResponse.checkout._id) {
                    setCheckoutID(checkoutResponse.checkout._id);

                 
                    const stripeResponse = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/api/v1/stripe/create-checkout-session`,
                        {
                            checkoutItems: cart.products,
                            totalPrice: cart.totalPrice,
                            checkoutId: checkoutResponse.checkout._id,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                            },
                        }
                    );

                  

                    // Save the sessionId in the Checkout document
                    
                    const updateSessionResponse = await axios.put(
                        `${import.meta.env.VITE_BACKEND_URL}/api/v1/checkout/update-session/${checkoutResponse.checkout._id}`,
                        {
                            sessionId: stripeResponse.data.id,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                            },
                        }
                    );

                

                    const stripe = await stripePromise;
                    const { error } = await stripe.redirectToCheckout({
                        sessionId: stripeResponse.data.id,
                    });

                    if (error) {
                        console.error("Error redirecting to Stripe Checkout:", error);
                        alert("Failed to redirect to payment page: " + error.message);
                    }
                }
            } catch (err) {
                console.error("Error creating checkout:", err.response?.data || err.message);
                alert("Failed to initiate payment: " + (err.response?.data?.message || err.message || "Unknown error"));
            }
        }
    };

    if (error) {
        return <p className="text-red-600 text-center">Error.... {error}</p>;
    }
    if (loading) {
        return <p className="text-green-500 text-center">Loading....</p>;
    }
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p className="text-red-600">Your cart is empty</p>;
    }

    return (
        <div className="tracking-tighter grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl uppercase mb-6">Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>
                    <div className="mb-4">
                        <label className="block text-gray-800">Email</label>
                        <input
                            type="email"
                            value={user ? user?.email : ""}
                            className="w-full p-2 border rounded"
                            disabled
                        />
                    </div>
                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-800">First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-800">Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-800">Address</label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, address: e.target.value })
                            }
                            className="w-full p-2 rounded border"
                            required
                        />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-800">City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-800">Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800">Country</label>
                            <input
                                type="text"
                                value={shippingAddress.country}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, country: e.target.value })
                                }
                                className="w-full p-2 rounded border"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800">Phone</label>
                            <input
                                type="text"
                                value={shippingAddress.phone}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, phone: e.target.value })
                                }
                                className="w-full p-2 rounded border"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full bg-black text-white py-3 rounded">
                            Pay with Stripe
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg mb-4">Order Summary</h3>
                <div className="border-t py-4 mb-4">
                    {cart?.products?.map((product, index) => (
                        <div key={index} className="flex items-start justify-between py-2 border-b">
                            <div className="flex items-start">
                                <img
                                    src={product?.image}
                                    alt={product?.name}
                                    className="w-20 h-2/4 object-cover mr-4"
                                />
                                <div>
                                    <h3 className="text-md text-gray-900">{product?.name}</h3>
                                    <p className="text-gray-700">Size: {product?.size}</p>
                                    <p className="text-gray-700">Color: {product?.color}</p>
                                </div>
                            </div>
                            <p className="text-xl">{product?.price?.toLocaleString()}</p>
                        </div>
                    ))}
                    <div className="flex justify-between items-center text-lg">
                        <p>Sub total</p>
                        <p>${cart?.totalPrice?.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <p>Shipping</p>
                        <p>Free</p>
                    </div>
                    <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
                        <p>Total</p>
                        <p>${cart?.totalPrice?.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;