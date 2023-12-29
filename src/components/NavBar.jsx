import React from "react";
import { logo } from "../assets";

const NavBar = () => {
  return (
    <header className="p-6">
      <nav>
        <span className="flex gap-2">
          <img src={logo} alt="" className="w-[30px]" />
          <h3 className="text-xl font-semibold">GreenOak Admin</h3>
        </span>
      </nav>
    </header>
  );
};

export default NavBar;
