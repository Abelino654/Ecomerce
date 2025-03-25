import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Col */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4 ">NewsLetter</h3>
          <p className="text-gray-600 mb-4">
            Stay ahead with our latest products, exclusive deals, and special
            events.
          </p>
          <p className="font-medium text-sm text-gray-700 mb-1">
            Sign up now and enjoy 5% off your next purchase!
          </p>

          {/* News form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-400 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-blue-whale text-white px-5 py-3 text-sm rounded-r-md hover:bg-hover-color transition-all"
            >
              Enroll
            </button>
          </form>
        </div>
        {/* Shops inks */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="#" className="hover:text-hover-color transition-colors">
                Gent's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-hover-color transition-colors">
                Ladie's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-hover-color transition-colors">
                Gent's Bottom wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-hover-color transition-colors">
                Ladie's bottom wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support inks */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="#" className="hover:text-hover-color transition-colors">
                Contact us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-hover-color transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-hover-color transition-colors">
                FAQ'S
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-hover-color transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Follows */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-hover-color"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a
              href="https://www.Instagram.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-hover-color"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_black"
              rel="noopener noreferrer"
              className="hover:text-hover-color"
            >
              <RiTwitterXLine className="h-6 w-6" />
            </a>
          </div>

          <p className="text-gray-800">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            +92-303-928-7727
          </p>
        </div>
      </div>

      {/* Copy right */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-600 text-sm text-center tracking-lighter">
          © 2025, Hassan Shehzad. Powered by Innovation, Reserved by Rights.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
