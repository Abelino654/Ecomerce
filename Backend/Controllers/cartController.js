const { getCart } = require("../lib/getCart");
const Product = require("../Models/Product");
const Cart = require("../Models/Cart"); //  Added missing Cart model import

//  Adding product to cart
const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity, color, size, guestId, userId } = req.body;
        //  Find Product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                request: "Request Failed",
                success: false,
                message: "Product not found"
            });
        }

        let cart = await getCart(userId, guestId);
        //  If cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex((prod) => {
                return prod.productId.equals(productId) && prod.size === size && prod.color === color
            });

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId: productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            //  Calculate total price
            cart.totalPrice = cart.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

            await cart.save();
            return res.status(200).json(
                cart
            );
        } else {
            //  Create New Cart
            const newCart = await Cart.create({
                userId: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity
                    }
                ],

                totalPrice: product.price * quantity
            });

            return res.status(201).json({
                cart: newCart
            });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            request: "Request Failed",
            message: "Internal server error",
            success: false
        });
    }
};



const updateQuantity = async (req, res) => {
    try {
        const { productId, quantity, color, size, guestId, userId } = req.body;
        //  Find Product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                request: "Request Failed",
                success: false,
                message: "Product not found"
            });
        }

        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).res.status(404).json({
                request: "Request Failed",
                success: false,
                message: "Product not found"
            });
        }
        //  If cart exists, update it
        const productIndex = cart.products.findIndex((prod) => {
            return prod.productId.equals(productId) && prod.size === size && prod.color === color
        });


        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }

            cart.totalPrice = cart.products.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity
            }, 0)



            await cart.save();

            return res.status(201).json(cart)
        }


    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            request: "Request Failed",
            success: false,
            message: "Internal server error"
        })
    }
}


const deleteCartItem = async (req, res) => {
    try {
        const { productId, size, color, userId, guestId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                request: "Request failed",
                success: false,
                message: "productId is required"
            });
        }

        const cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(200).json({
                request: "Request failed",
                success: false,
                message: "not cart found"
            });
        }

        const cartIndex = cart.products.findIndex((prod) => {
            return prod.productId.toString() === productId && prod.size === size && prod.color === color;
        });

        if (cartIndex > -1) {
            cart.products.splice(cartIndex, 1);
            cart.totalPrice = cart.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        } else {
            return res.status(404).json({
                request: "Request failed",
                success: false,
                message: "Product not found in cart"
            });
        }

        await cart.save();
        return res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            request: "Request failed",
            success: false,
            message: "Internal server error"
        });
    }
};

// Get User or guest details
const getUser = async (req, res) => {
    try {
        const { userId, guestId } = req.query;

        const cart = getCart(userId, guestId);

        if (!cart) {
            res.status(404).json({
                request: "Request Failed",
                success: false,
                message: "User or guest not found "
            })
        }


        return res.status(200).json(cart)
    } catch (err) {

        console.error(err.message)
        return res.status(500).json({
            success: false,
            request: "Request Failed",
            message: "Internal server error",

        })
    }
}



const mergeCarts = async (req, res) => {
    try {
        let { guestId } = req.body;
        const userId = req.user._id;
        const userCart = await Cart.findOne({ userId });
        const guestCart = await Cart.findOne({ guestId });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(404).json({
                    success: false,
                    request: "Request Failed",
                    message: "No Product found in guest cart"
                });
            }

            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((prod) =>
                        prod.productId.equals(guestItem.productId) &&
                        prod.size === guestItem.size &&
                        prod.color === guestItem.color
                    );

                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        userCart.products.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
                await userCart.save();
                await Cart.findOneAndDelete({ guestId });

                return res.status(200).json(
                    userCart
                );
            } else {
                guestCart.userId = userId;
                guestCart.guestId = undefined;
                await guestCart.save();

                return res.status(200).json({ cart: guestCart });
            }
        } else {
            return userCart ? res.status(200).json(userCart) : res.status(404).json({ message: "Guest cart not found" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            request: "Request Failed",
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { addProductToCart, updateQuantity, deleteCartItem, getUser, mergeCarts };
