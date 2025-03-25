const Order = require("../Models/Order");



const getUserOrders = async (req, res) => {

    try {


        const orders = await Order.find({ userId: req.user._id }).sort({ created: -1 })

        if (!orders) {
            return res.status(404).json({
                message: "Orders not found"
            })
        }


        return res.status(200).json({ message: "Orders Founded", orders })

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Get Order By id
const getOrderById = async (req, res) => {
    try {


        const orders = await Order.findById(req.params.id).populate(
            "userId",
            "name email"
        );

        if (!orders) {
            return res.status(404).json({
                message: "Orders not found"
            })
        }


        return res.status(200).json({ message: "Orders Founded",orders })

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = { getUserOrders, getOrderById };