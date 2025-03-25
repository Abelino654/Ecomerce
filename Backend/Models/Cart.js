const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
    , name: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    quantity: {
        type: Number
        ,
        default: 1
    }
}, {
    _id: false
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    guestId: {
        type: String
    },
    products:[cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }

}, {
    timestamps: true
})



module.exports = mongoose.model("Cart", cartSchema)