const Cart = require("../Models/Cart");
const Checkout = require("../Models/Checkout");
const Order = require("../Models/Order");

const newCheckout = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;


    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No items exist",
        });
    }

    const validPaymentMethods = ["JazzCash", "EasyPaisa", "CashOnDelivery", "Stripe"];
    if (!validPaymentMethods.includes(paymentMethod)) {
        return res.status(400).json({
            success: false,
            message: `Invalid payment method. Supported methods: ${validPaymentMethods.join(", ")}`,
        });
    }

    if (paymentMethod === "JazzCash" && !req.body.transactionId) {
        return res.status(400).json({
            success: false,
            message: "Transaction ID is required for JazzCash payments",
        });
    }

    try {
        const checkout = await Checkout.create({
            userId: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            paymentStatus: "pending",
            isPaid: false,
            totalPrice,
            paymentDetails: paymentMethod === "JazzCash" ? { transactionId: req.body.transactionId } : {},
        });

        return res.status(201).json({ success: true, checkout });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateSessionId = async (req, res) => {
    const { sessionId } = req.body;
    const checkoutId = req.params.id;


    try {
        const checkout = await Checkout.findById(checkoutId);
        if (!checkout) {
            return res.status(404).json({
                success: false,
                message: "Checkout not found",
            });
        }

        checkout.paymentDetails = { ...checkout.paymentDetails, sessionId };
        await checkout.save();


        return res.status(200).json({
            success: true,
            message: "Session ID updated successfully",
        });
    } catch (err) {
        console.error("Error updating session ID:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
const checkoutPaid = async (req, res) => {
    try {
        const { paymentStatus, paymentDetails } = req.body;


        if (!paymentStatus || !paymentDetails) {
            return res.status(400).json({
                success: false,
                message: "Payment status and payment details are required",
            });
        }

        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({
                success: false,
                message: "Checkout not found",
            });
        }

        if (paymentStatus === "paid") {
            if (checkout.paymentMethod === "Stripe") {
                const { sessionId } = paymentDetails;

                const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
                const session = await stripe.checkout.sessions.retrieve(sessionId);


                if (session.payment_status !== "paid") {
                    
                    return res.status(400).json({
                        success: false,
                        message: "Payment verification failed",
                    });
                }

                checkout.paymentDetails = {
                    sessionId,
                    paymentIntentId: session.payment_intent,
                    status: session.payment_status,
                };
            }

            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paidAt = Date.now();
            await checkout.save();


            return res.status(200).json(checkout);
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid payment status",
            });
        }
    } catch (err) {
        console.error("Error in checkoutPaid:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const checkout = async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({
                success: false,
                message: "Checkout not found",
            });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const order = await Order.create({
                userId: checkout.userId,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
                paymentMethod: checkout.paymentMethod,
            });


            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            const deletedCart = await Cart.findOneAndDelete({ userId: checkout.userId });
            if (!deletedCart) {
                console.warn(`No cart found for user ${checkout.userId}`);
            }

            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                order,
            });
        } else if (checkout.isFinalized) {
            return res.status(400).json({
                success: false,
                message: "Checkout already finalized",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Checkout is not paid",
            });
        }
    } catch (err) {
        console.error("Error in checkout:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { newCheckout, checkoutPaid, checkout, updateSessionId };