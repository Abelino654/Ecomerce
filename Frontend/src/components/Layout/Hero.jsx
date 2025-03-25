import React from "react";
import hero from "../../assets/hero2.webp";
import { Link } from "react-router-dom"
function Hero() {
  return (
    <section className="hero_section relative">
      <img
        src={hero}
        alt="hero"
        className="w-full h-[400px] md:h-[600px] lg:[h-750px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Escape<br />
            in Style
          </h1>
          <p className="text-sm p-3 bg-blue-whale rounded-sm tracking-tighter md:text-lg mb-6">
            Discover trendy vacation styles, delivered swiftly worldwide for your perfect getaway!   </p>
          <Link to="#" className="bg-white text-gray-900 px-6 py-2 rounded-sm text-lg">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
