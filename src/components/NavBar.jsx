import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { accessToken } = useSelector((state) => state.loginadmin);
  return (
    <header className="p-6">
      <nav className="flex items-center justify-between">
        <Link className="flex gap-2" to={accessToken ? "/dash" : "/"}>
          <img src={logo} alt="" className="w-[30px]" />
          <h3 className="text-xl font-semibold">GreenOak Admin</h3>
        </Link>
        <HiMenu />
      </nav>
    </header>
  );
};

export default NavBar;
