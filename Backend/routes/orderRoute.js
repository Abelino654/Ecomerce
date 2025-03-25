const express = require("express");
const router = express.Router();

const {protect} = require("../middleWare/protect");
const { getUserOrders, getOrderById } = require("../Controllers/orderController");

// Get orders for logged ing user
router.get("/getUserOrders", protect, getUserOrders);
router.get("/getOrderById/:id", protect, getOrderById);


module.exports = router;