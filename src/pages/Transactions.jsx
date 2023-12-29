import React from "react";
import { construction } from "../assets";

const Transactions = () => {
  return (
    <section className="p-6 flex flex-col gap-6">
      <h3 className="text-xl">Transactions</h3>
      <figure className="flex items-center justify-center">
        <img src={construction} alt="" className="w-full md:w-[300px]" />
      </figure>
      <p className="font-extralight text-center text-green-700">
        Page is currently under construction, check back later.
      </p>
    </section>
  );
};

export default Transactions;
