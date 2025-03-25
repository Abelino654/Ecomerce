const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkoutItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String },
            size: { type: String },
            color: { type: String }
        }
    ],
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['JazzCash', 'EasyPaisa', 'CashOnDelivery','Stripe'], // Sirf supported methods allow karo
        default: 'Stripe'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentDetails: {
        transactionId: { type: String }, // JazzCash ka transactionId
        responseCode: { type: String }, // JazzCash ka response code (jaise '000' for success)
        responseMessage: { type: String } // JazzCash ka response message
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isFinalized: {
        type: Boolean,
        default: false
    },
    finalizedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Checkout', checkoutSchema);