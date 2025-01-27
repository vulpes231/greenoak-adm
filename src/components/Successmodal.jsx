/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { MdCheckCircle } from "react-icons/md";

const Successmodal = ({ text }) => {
  return (
    <div className="p-7 bg-green-50 shadow absolute top-[30px] right-5 flex items-center justify-center text-green-500 gap-2">
      <MdCheckCircle />
      {text}
    </div>
  );
};

export default Successmodal;
