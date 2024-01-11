import React, { useEffect } from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.loginadmin);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);
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
