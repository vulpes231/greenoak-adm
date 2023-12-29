import React from "react";
import Button from "./Button";

const Landing = () => {
  return (
    <section className="p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button path="/create-user" title="Create User" />
        <Button path="/create-transaction" title="Create Transaction" />
        <Button path="/get-users" title="Get Users" />
        <Button path="/get-transactions" title="Get Transactions" />
      </div>
    </section>
  );
};

export default Landing;
