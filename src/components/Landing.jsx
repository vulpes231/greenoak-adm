import React from "react";
import Button from "./Button";

const Landing = () => {
  return (
    <section className="p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Button path="/create-user" title="Create User" />
        <Button path="/create-transaction" title="Create Transaction" />
      </div>
    </section>
  );
};

export default Landing;
