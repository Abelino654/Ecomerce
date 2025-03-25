import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCheckout } from "../../redux/slices/checkoutSlice";

const PaymentReturn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const processPayment = async () => {
            if (isProcessing) return;
            setIsProcessing(true);

            const query = new URLSearchParams(location.search);
            const sessionId = query.get("session_id");
            const checkoutId = query.get("checkout_id");

    

            if (!sessionId || !checkoutId) {
                alert("Invalid payment session.");
                navigate("/checkout");
                return;
            }

            try {
              
                const payRes = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/checkout/pay/${checkoutId}`,
                    {
                        paymentStatus: "paid",
                        paymentDetails: {
                            sessionId,
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        },
                    }
                );

             

                if (payRes.status === 200) {
                    dispatch(setCheckout(payRes.data)); // Update Redux store

               
                    const finalizeRes = await axios.put(
                        `${import.meta.env.VITE_BACKEND_URL}/api/v1/checkout/finalized/pay/${checkoutId}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                            },
                        }
                    );

                

                    if (finalizeRes.status === 201) {
                        navigate("/order-confirmation");
                    } else if (finalizeRes.status === 400 && finalizeRes.data.message === "Checkout already finalized") {
                        // If checkout is already finalized, redirect to order-confirmation
                        navigate("/order-confirmation");
                    } else {
                        alert("Failed to finalize checkout: " + finalizeRes.data.message);
                        navigate("/checkout");
                    }
                } else {
                    alert("Failed to mark checkout as paid.");
                    navigate("/checkout");
                }
            } catch (err) {
                console.error("Error in payment processing:", err.response?.data || err.message);
                if (err.response?.status === 400 && err.response?.data?.message === "Checkout already finalized") {
                    // If checkout is already finalized, redirect to order-confirmation
                    navigate("/order-confirmation");
                } else {
                    alert("Payment processing failed: " + (err.response?.data?.message || err.message));
                    navigate("/checkout");
                }
            } finally {
                setIsProcessing(false);
            }
        };

        processPayment();
    }, [location, navigate, dispatch]);

    return (
        <div className="text-center py-10">
            <h2 className="text-2xl">Processing Payment...</h2>
            <p>Please wait while we verify your payment.</p>
        </div>
    );
};

export default PaymentReturn;