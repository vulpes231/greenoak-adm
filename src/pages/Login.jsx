import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminSignin, reset } from "../features/loginAdminSlice";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, SetForm] = useState(initialState);
  // const [submitted, SetSubmitted] = useState(false);

  const { loginError, loginLoading, accessToken } = useSelector(
    (state) => state.loginadmin
  );

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
    dispatch(adminSignin(form));
  };

  const resetInput = () => {
    SetForm(initialState);
  };

  useEffect(() => {
    let timeout;

    if (loginError) {
      timeout = setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [loginError]);

  useEffect(() => {
    let timeout;

    if (accessToken) {
      console.log(accessToken);
      resetInput();
      timeout = setTimeout(() => {
        // dispatch(reset())
        navigate("/dash");
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [accessToken]);

  return (
    <section className="p-6 flex flex-col gap-6">
      <h3 className="font-bold text-lg text-center capitalize">
        Login as Admin
      </h3>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:max-w-[500px] md:mx-auto w-full"
      >
        <label htmlFor="" className="flex flex-col gap-1">
          Username
          <Input
            value={form.username}
            name={"username"}
            handleOnChange={handleInputChange}
            placeHolder={"Enter Admin Username"}
            type={"text"}
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-1">
          Password
          <Input
            value={form.password}
            name={"password"}
            handleOnChange={handleInputChange}
            placeHolder={"Enter Admin Password"}
            type={"password"}
          />
        </label>
        {loginError && <p className="text-red-500">{loginError}</p>}
        <button className="bg-green-700 p-3 text-white font-light md:font-semibold tracking-wider rounded-lg w-full text-center">
          {loginLoading ? "Logging in..." : "Login"}
        </button>
        <p className="font-extralight text-sm">
          Don't have and admin account?{" "}
          <Link to={"/new-admin"} className="text-green-700 underline">
            Create Now
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
