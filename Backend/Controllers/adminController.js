
const User = require('../Models/User');
const Product = require('../Models/Product');
const Order = require('../Models/Order');
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        return res.status(200).json({ message: "Users founded", users })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}









// Add a new user
const addNewAdmin = async (req, res) => {
    try {

          
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "user with this emails is already registered" })

        user = new User({
            name,
            email,
            password,
            role: role || "customer"
        })


        await user.save();
        return res.status(201).json({
            message: "Created Successfully",
            user
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


// Update admin  credentials
const updateDetails = async (req, res) => {
    try {


        const user = await User.findById(req.params.id);
    
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        await user.save();
        return res.status(201).json({
            message: "Data updated successfully",
            user
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


// Delete User
const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        return res.status(200).json({
            message: "User deleted Sucessfully",
            user
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}




// Get Admin all Products
const getAllProducts = async (req, res) => {
    try {


        const products = await Product.find({});
        if (!products) return res.status(400).json({
            message: "Products does not found"
        })

        return res.status(200).json({
            message: "Products Founds",
            products
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}



// Orders routes

const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find({}).populate("userId", "name email");
        if (!orders) return res.status(404).json({ message: "Orders does not found" });


        return res.status(200).json({
            message: "Orders Founded",
            orders
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


// Update orders
const updateOrder = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id).populate("userId", "name email");
        if (!order) return res.status(404).json({
            message: "Order not found"
        })
        order.status = req.body.status || order.status;
        order.isDelivered = req.body.status === "delivered" ? true : order.isDelivered;
        order.deliveredAt = req.body.status === "delivered" ? Date.now() : order.deliveredAt;

        const updatedOrder = await order.save();

        return res.status(200).json({
            message: "Order updated successfully",
            updatedOrder
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const deleteOrder = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({
            message: "Internal server error",

        })

        await order.deleteOne();
        return res.status(200).json({
            message: "Order Deleted successfully",
            order
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}
module.exports = { getAllUsers, addNewAdmin, updateDetails, deleteUser, getAllProducts, getAllOrders, updateOrder, deleteOrder };