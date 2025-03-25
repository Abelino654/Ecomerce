const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect");
const { newCheckout, checkoutPaid, checkout, updateSessionId } = require("../Controllers/checkoutConrtroller");

// New Checkout
router.post("/createCheckout", protect, newCheckout);
router.put("/update-session/:id", protect, updateSessionId);
router.put("/pay/:id", protect, checkoutPaid);
router.put("/finalized/pay/:id", protect, checkout);

module.exports = router;