/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { authLinks } from "../constants";
import { Link } from "react-router-dom";

const Sidebar = ({ active, setActive }) => {
  return (
    <div className="h-screen w-[320px] bg-black text-white flex flex-col gap-6">
      <h3 className="mb-5 p-4">Welcome Admin.</h3>
      {authLinks.map((link) => {
        return (
          <Link
            key={link.id}
            to={link.path}
            onClick={() => setActive(link.title.toLowerCase())}
            className={`${
              active === link.title.toLowerCase() ? "bg-green-700" : ""
            } py-2 px-8 text-white`}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
