import React from "react";

const Input = ({ type, placeHolder, name, handleOnChange, value }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      name={name}
      onChange={handleOnChange}
      value={value}
      className="border-2 w-full py-2 px-2 md:py-3 outline-green-400 text-lg md:text-xl placeholder:text-sm "
    />
  );
};

export default Input;
