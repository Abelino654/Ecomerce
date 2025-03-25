import React from "react";
import TopBar from "../Layout/TopBar";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="border-b border-gray-300">
      <TopBar/>
      <NavBar/>
    </header>
  );
}

export default Header;
