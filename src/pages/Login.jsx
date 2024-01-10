import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [form, SetForm] = useState(initialState);
  const [submitted, SetSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    SetSubmitted(true);
  };

  const resetInput = () => {
    SetForm(initialState);
  };

  useEffect(() => {
    let timeout;

    if (submitted) {
      resetInput();
      timeout = setTimeout(() => {
        SetSubmitted(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [submitted]);

  return (
    <section className="p-6">
      <h3>Login as Admin</h3>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="">
          Username
          <Input
            value={form.username}
            name={"username"}
            handleOnChange={handleInputChange}
            placeHolder={"Enter Admin Username"}
            type={"text"}
          />
        </label>
        <label htmlFor="">
          Password
          <Input
            value={form.password}
            name={"password"}
            handleOnChange={handleInputChange}
            placeHolder={"Enter Admin Password"}
            type={"password"}
          />
        </label>
        <button className="bg-green-700 p-3 text-white font-light md:font-semibold tracking-wider rounded-lg w-full text-center">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
