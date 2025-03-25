import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

function NavBar() {

  const { user } = useSelector(store => store.auth)
  const { cart } = useSelector(store => store.cart);
  const cartCount = cart?.products?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;
  //  Handling cart Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const handleCartDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSideBar = () => {
    setSideBar(!sideBar);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-5 py-3">
        {/* Left Logo  */}
        <div>
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-[#0D6EFD] to-[#52A9FF] text-transparent bg-clip-text tracking-wide drop-shadow-lg"
          >
            Bazario
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-800 hover:text-blue-whale text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-gray-800 hover:text-blue-whale text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-gray-800 hover:text-blue-whale text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
          <Link
            to="/collections/all?gender=Men"
            className="text-gray-800 hover:text-blue-whale text-sm font-medium uppercase"
          >
            Men
          </Link>
        </div>

        {/* Right Profile */}
        <div className="flex items-center space-x-3">
          <Link to="/profile" className="hover:text-blue-whale">
            <HiOutlineUser className="w-6 h-6 text-gray-800 " />
          </Link>

          {user && user.role === "admin" && (
            <Link to="/admin" className="block bg-black px-2 rounded-sm text-white">
              Admin
            </Link>
          )}
          <button
            className="relative hover:text-blue-whale"
            onClick={handleCartDrawerToggle}
          >

            <HiOutlineShoppingBag className="h-6 w-6 text-gray-800" />
            {cartCount && (
              <span className="absolute top-4 -right-2 bg-blue-whale text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )
            }
          </button>
          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button className="md:hidden" onClick={handleSideBar}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </nav>
      <CartDrawer
        drawerOpen={drawerOpen}
        handleCartDrawerToggle={handleCartDrawerToggle}
      />

      {/* Side Bar */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white transition-transform duration-500 z-50 ${sideBar ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-end p-4">
          <button>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/*Contents  */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-2">
            <Link
              to="/collections/all?gender=Men"
              onClick={handleSideBar}
              className="block text-gray-800  hover:text-hover-color"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={handleSideBar}
              className="block text-gray-800 hover:text-hover-color"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={handleSideBar}
              className="block text-gray-800  hover:text-hover-color"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={handleSideBar}
              className="block text-gray-800  hover:text-hover-color"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default NavBar;
