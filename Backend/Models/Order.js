const mongoose = require("mongoose");


// Child collection 
const orderItemSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        color: String,
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    _id: false
})




const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderItems: [orderItemSchema],
    shippingAddress: {
        address: {
            required: true,
            type: String,
        },
        city: {
            required: true,
            type: String,
        },
        postalCode: {
            required: true,
            type: String
        },
        country: {
            required: true,
            type: String
        }

    },
    paymentMethod: {
        required: true,
        type: String
    },
    totalPrice: {
        required: true,
        type: Number
    },
    isPaid: {
        default: false,
        type: Boolean
    },
    paidDate: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    status: {
        type: String,
        enum: ["processing", "shipped", "delivered", "cancelled"],
        default: "processing"
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("Order", orderSchema);