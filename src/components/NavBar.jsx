import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="p-6">
      <nav>
        <Link className="flex gap-2" to="/">
          <img src={logo} alt="" className="w-[30px]" />
          <h3 className="text-xl font-semibold">GreenOak Admin</h3>
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
