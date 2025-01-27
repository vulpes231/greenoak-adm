/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminSignin, resetLogin } from "../features/loginSlice";

import {} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import Errormodal from "../components/Errormodal";
import Loadingmodal from "../components/Loadingmodal";
import Successmodal from "../components/Successmodal";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, SetForm] = useState(initialState);
  const [error, SetError] = useState("");

  const { loginError, loginLoading, accessToken } = useSelector(
    (state) => state.signin
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
    for (const key in form) {
      if (form[key] === "") {
        return SetError(`${key} is required`);
      }
    }
    dispatch(adminSignin(form));
  };

  const resetInput = () => {
    SetForm(initialState);
  };

  useEffect(() => {
    if (loginError) {
      SetError(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    let timeout;

    if (error) {
      timeout = setTimeout(() => {
        SetError("");
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;

    if (accessToken) {
      timeout = setTimeout(() => {
        sessionStorage.setItem("accessToken", accessToken);
        resetInput();
        window.location.href = "/dash";
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [accessToken, navigate]);

  return (
    <section className="p-4 flex flex-col gap-6 bg-slate-200 h-screen items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 sm:w-[380px] md:mx-auto w-full bg-white shadow p-8 rounded-sm"
      >
        <h3 className="font-bold text-3xl flex items-center">
          <MdAdminPanelSettings size={40} /> Login as Admin
        </h3>

        <Input
          value={form.username}
          name={"username"}
          handleOnChange={handleInputChange}
          placeHolder={"Enter Username"}
          type={"text"}
        />

        <Input
          value={form.password}
          name={"password"}
          handleOnChange={handleInputChange}
          placeHolder={"Enter Password"}
          type={"password"}
        />

        {error && <Errormodal text={error} />}
        <button className="bg-green-600 py-2.5 text-white font-semibold  tracking-wider rounded-3xl w-full text-center">
          {"Sign in"}
        </button>
      </form>
      {loginLoading && <Loadingmodal text={"Signing in..."} />}
      {accessToken && <Successmodal text={"Signin Success."} />}
    </section>
  );
};

export default Login;
