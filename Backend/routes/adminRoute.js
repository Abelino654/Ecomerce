const express = require("express");
const { getAllUsers, addNewAdmin, updateDetails, deleteUser, getAllProducts, getAllOrders, updateOrder, deleteOrder } = require("../Controllers/adminController");
const { protect, isAdmin } = require("../middleware/protect");
const router = express.Router();

// Admin user details
router.get("/getAllUsers", protect, isAdmin, getAllUsers);
router.post("/addNewAdmin", addNewAdmin);
router.put("/updateDetails/:id", protect, isAdmin, updateDetails);
router.delete("/deleteUser/:id", protect, isAdmin, deleteUser);


// Admin Products
router.get("/getAllProducts", protect, isAdmin, getAllProducts);



// Admin Order route
router.get("/getAllOrders", protect, isAdmin, getAllOrders);
router.put("/updateOrder/:id", protect, isAdmin, updateOrder);
router.delete("/deleteOrder/:id", protect, isAdmin, deleteOrder);
module.exports = router