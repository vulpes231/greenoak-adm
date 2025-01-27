/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { options } from "../constants";

import { createUser, resetCreateUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  username: "",
  password: "",
  fullname: "",
  email: "",
  phone: "",
  address: "",
  account_type: "",
  gender: "",
  dob: "",
};

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const [form, SetForm] = useState(initialState);

  const { createUserLoading, createUserError, userCreated } = useSelector(
    (state) => state.user
  );

  const myoptions = options.map((opt) => {
    return (
      <option key={opt.id} value={opt.title}>
        {opt.title}
      </option>
    );
  });

  const resetInput = () => {
    SetForm(initialState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(createUser(form));
  };

  useEffect(() => {
    if (userCreated) {
      resetInput();
      setTimeout(() => {
        dispatch(resetCreateUser());
      }, 2000);
    }
  }, [dispatch, userCreated]);

  return (
    <section className="p-6 flex flex-col gap-6">
      <h3 className="text-xl">Create User</h3>
      <form
        action=""
        className="space-y-6 font-extralight"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="">
          Username
          <Input
            type="text"
            value={form.username}
            handleOnChange={handleInputChange}
            placeHolder="Username"
            name="username"
          />
        </label>
        <label htmlFor="">
          Password
          <Input
            type="password"
            value={form.password}
            handleOnChange={handleInputChange}
            placeHolder="Password"
            name="password"
          />
        </label>
        <label htmlFor="">
          Full Name
          <Input
            type="text"
            value={form.fullname}
            handleOnChange={handleInputChange}
            placeHolder="Full Name"
            name="fullname"
          />
        </label>
        <label htmlFor="">
          Email
          <Input
            type="email"
            value={form.email}
            handleOnChange={handleInputChange}
            placeHolder="Email"
            name="email"
          />
        </label>
        <label htmlFor="">
          Phone
          <Input
            type="text"
            value={form.phone}
            handleOnChange={handleInputChange}
            placeHolder="Phone"
            name="phone"
          />
        </label>
        <label htmlFor="">
          Address
          <Input
            type="text"
            value={form.address}
            handleOnChange={handleInputChange}
            placeHolder="Address"
            name="address"
          />
        </label>
        <label htmlFor="">
          Account Type
          <select
            name="account_type"
            className="border-2 w-full py-2 px-2 md:py-3 outline-green-400 text-lg md:text-xl"
            value={form.account_type}
            onChange={handleInputChange}
          >
            <option value="">Choose Account</option>
            {myoptions}
          </select>
        </label>
        <label htmlFor="">
          Gender
          <select
            name="gender"
            className="border-2 w-full py-2 px-2 md:py-3 outline-green-400 text-lg md:text-xl"
            value={form.gender}
            onChange={handleInputChange}
          >
            <option value="">Gender Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label htmlFor="">
          Date of birth
          <Input
            type="text"
            value={form.dob}
            handleOnChange={handleInputChange}
            placeHolder="mm/dd/yyyy"
            name="dob"
          />
        </label>
        {createUserError && <p className="text-red-500">{createUserError}</p>}
        <button className="bg-green-700 px-2 py-3 w-full md:w-[250px] md:mx-auto text-white rounded-xl font-bold">
          {createUserLoading ? "Creating User..." : "Create User"}
        </button>
      </form>
    </section>
  );
};

export default CreateUserForm;
