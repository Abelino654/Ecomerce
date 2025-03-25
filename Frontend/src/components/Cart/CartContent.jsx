  import React from "react";
  import { RiDeleteBin3Line } from "react-icons/ri";
  import { useDispatch } from "react-redux";
  import { removeItemFromCart, updateCartQuantity } from "../../redux/slices/cartSlice";
  function CartContent({ cart, userId, guestId }) {

    const dispatch = useDispatch();


    // Adding a cart
    const handleAddToCart = (productId, delta, quantity, size, color) => {
      const newQuantity = quantity + delta;
      if (newQuantity >= 1) {
        dispatch(updateCartQuantity(productId, newQuantity, guestId, userId, size, color))
      }
    }

    // Removing a cart
    const removeCart = (productId, size, color) => {
    
      dispatch(removeItemFromCart({productId, guestId, userId, size, color}))
    }

    return (
      <div>
        {cart?.products?.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b-2"
          >
            {/* Img */}
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover  rounded"
              />
            </div>

            {/* Product Name */}
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-900">
                Size: {product.size} | Color: {product.color}
              </p>

              {/* Buttons */}
              <div className="flex items-center mt-2">
                <button className="border rounded px-2  text-xl" onClick={() => { handleAddToCart(product._id, -1, product.quantity, product.size, product.color) }}>-</button>
                <span className="mx-4 text-xl font-semibold">
                  {product.quantity}
                </span>
                <button className="border rounded px-2  text-xl" onClick={() => { handleAddToCart(product._id, +1, product.quantity, product.size, product.color) }}>+</button>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col items-end">
              <p className="font-medium">${product.price.toLocaleString()}</p>
              <button>
                <RiDeleteBin3Line onClick={() => {
                
                  removeCart(product.productId, product.size, product.color)
                }} className="h-6 w-6 mt-2 text-red-900" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  export default CartContent;
