/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Input = ({ type, placeHolder, name, handleOnChange, value }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      name={name}
      onChange={handleOnChange}
      value={value}
      autoComplete="off"
      className="w-full py-2 px-4 md:py-2.5 text-lg md:text-xl placeholder:text-xs bg-slate-100 outline-none border-none"
    />
  );
};

export default Input;
