/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaDragon } from "react-icons/fa";

const Errormodal = ({ text }) => {
  return (
    <div className="p-7  shadow rounded-lg absolute top-[30px] right-5 flex items-center justify-center bg-red-50 text-red-500 text-sm gap-2">
      <FaDragon /> {text}
    </div>
  );
};

export default Errormodal;
