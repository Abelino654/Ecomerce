const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { protect } = require("../middleware/protect");

router.post("/create-checkout-session", protect, async (req, res) => {
    try {
        

        const { checkoutItems, totalPrice, checkoutId } = req.body;

        // Validate request body
        if (!checkoutItems || !totalPrice || !checkoutId) {
            return res.status(400).json({ message: "Missing required fields: checkoutItems, totalPrice, or checkoutId" });
        }

        const lineItems = checkoutItems.map((item) => ({
            price_data: {
                currency: "usd", // Change to PKR if Stripe supports it for your account
                product_data: {
                    name: item.name,
                    description: `Size: ${item.size}, Color: ${item.color}`,
                },
                unit_amount: Math.round(item.price * 100), // Price in cents
            },
            quantity: item.quantity || 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/payment-return?session_id={CHECKOUT_SESSION_ID}&checkout_id=${checkoutId}`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout`,
            metadata: {
                checkoutId: checkoutId,
            },
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error("Error creating checkout session:", err);
        res.status(500).json({ message: err.message || "Internal server error" });
    }
});

module.exports = router;