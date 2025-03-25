import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function CartDrawer({ drawerOpen, handleCartDrawerToggle }) {
  const navigate = useNavigate();

  const { user, guestId } = useSelector(store => store.auth);
  const userId = user ? user._id : null;
  const { cart } = useSelector(store => store.cart);

  const handleCheckout = () => {
    handleCartDrawerToggle();
    if (!user) {
      navigate("/login?redirect=checkout")
    } else {
      navigate("/checkout")
    }
  }
  return (
    <>
      <div
        className={`fixed top-0 right-0 w-3/4 sm-w-1/4 md:w-[22rem] h-full bg-white shadow-lg transform transition-transform duration-400 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={handleCartDrawerToggle}>
            <IoMdClose className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Cards */}
        <div className="flex-grow p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Carts</h2>
          {/* Contents */}

          {cart && cart?.products?.length > 0 ? (
            <CartContent cart={cart} userId={userId} guestId={guestId} />) : (<p className="text-center text-red-500">Your cart is empty</p>)
          }
        </div>

        {/* Cart Footer */}
        <div className="p-4 bg-white bottom-0">

          {cart && cart?.products?.length > 0 ? (
            <>
              <button className="w-full bg-blue-whale text-white py-3 rounded-lg font-semibold hover:bg-hover-color transition" onClick={handleCheckout}>
                Checkout
              </button>
              <p className="text-sm tracking-tighter text-gray-700 mt-2 text-center">
                Final shipping costs, taxes, and discounts will be applied at
                checkout.
              </p>
            </>
          ) : (<></>)}
        </div>
      </div>
    </>
  );
}

export default CartDrawer;
