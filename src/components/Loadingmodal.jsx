/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Loadingmodal = ({ text }) => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-85">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-700"></div>
        <div className="text-white">{text}</div>
      </div>
    </div>
  );
};

export default Loadingmodal;
