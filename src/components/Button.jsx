import React from "react";
import { Link } from "react-router-dom";

const Button = ({ path, title }) => {
  return (
    <Link
      to={path}
      className="bg-green-700 p-3 text-white font-light md:font-semibold tracking-wider rounded-lg w-full text-center"
    >
      {title}
    </Link>
  );
};

export default Button;
