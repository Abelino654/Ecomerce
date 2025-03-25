const express = require("express");
const { addProduct, updateProduct, deleteProduct, getFilterProducts, getSimilarProducts, getProductByID, bestSeller, newArrivals } = require("../Controllers/productController");
const { protect, isAdmin } = require("../middleware/protect");
const router = express.Router();


router.post("/addproduct", protect, isAdmin, addProduct);
router.put("/updateProduct/:id", protect, isAdmin, updateProduct);
router.delete("/deleteProduct/:id", protect, isAdmin, deleteProduct);
router.get("/filterProducts", getFilterProducts);
router.get("/getSimilarProduct/:id",  getSimilarProducts);
router.get("/singleProduct/:id", getProductByID);
router.get("/best-seller", bestSeller);
router.get("/new-arrivals", newArrivals);



module.exports = router