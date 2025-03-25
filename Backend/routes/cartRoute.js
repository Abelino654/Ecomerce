const express = require("express");
const router = express.Router();

const Product = require("../Models/Product");
const User = require("../Models/User");
const { protect } = require("../middleWare/protect");
const { addProductToCart, updateQuantity, deleteCartItem,  mergeCarts } = require("../Controllers/cartController");
// Post the items
router.post("/addCart", addProductToCart);
router.put("/updateCartQuantity", updateQuantity);
router.delete("/deleteCartItem", deleteCartItem);
router.post("/mergeCarts", protect ,mergeCarts);



module.exports = router;