/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { createTrxn, resetCreateTrnx } from "../features/trnxSlice";
import { getAccessToken } from "../constants";

const initialState = {
  initiator: "",
  sender: "",
  account: "",
  amount: "",
  description: "",
  date: "",
  type: "",
};

const CreateTransactionForm = () => {
  const dispatch = useDispatch();
  const [form, SetForm] = useState(initialState);

  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { createTrnxLoading, createTrnxError, createTrnxSuccess } = useSelector(
    (state) => state.trnx
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Setting ${name} to ${value}`);
    SetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetInput = () => {
    SetForm(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    dispatch(createTrxn(form));
  };

  useEffect(() => {
    if (createTrnxSuccess) {
      resetInput();
      setTimeout(() => {
        dispatch(resetCreateTrnx());
      }, 2000);
    }
  }, [dispatch, createTrnxSuccess]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <section className="p-6 flex flex-col gap-6">
      <h3>Create Transaction</h3>
      <form
        action=""
        className="space-y-6 font-extralight"
        onSubmit={handleSubmit}
      >
        <label htmlFor="">
          Initiator
          <Input
            placeHolder="Initiator"
            value={form.initiator}
            handleOnChange={handleInputChange}
            name="initiator"
          />
        </label>
        <label htmlFor="">
          Sender
          <Input
            placeHolder="Sender's Name"
            value={form.sender}
            handleOnChange={handleInputChange}
            name="sender"
          />
        </label>
        <label htmlFor="">
          Account
          <Input
            placeHolder="Account No"
            value={form.account}
            handleOnChange={handleInputChange}
            name="account"
          />
        </label>
        <label htmlFor="">
          Amount
          <Input
            placeHolder="$0.00"
            value={form.amount}
            handleOnChange={handleInputChange}
            name="amount"
          />
        </label>
        <label htmlFor="">
          Memo
          <Input
            placeHolder="Memo or descriptionription"
            value={form.description}
            handleOnChange={handleInputChange}
            name="description"
          />
        </label>
        <label htmlFor="">
          Transaction Type
          <select
            name="type"
            value={form.type}
            onChange={handleInputChange}
            className="border-2 w-full py-2 px-2 md:py-3 outline-green-400 text-lg md:text-xl"
          >
            <option value="">Select Type</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </label>
        <label htmlFor="">
          Date
          <Input
            placeHolder="mm/dd/yyyy"
            value={form.date}
            handleOnChange={handleInputChange}
            name="date"
          />
        </label>
        {createTrnxError && <p className="text-red-500">{createTrnxError}</p>}
        {createTrnxSuccess && (
          <p className="text-green-500">Transaction created successfully.</p>
        )}
        <button className="bg-green-700 px-2 py-3 w-full md:w-[250px] md:mx-auto text-white rounded-xl font-bold">
          {createTrnxLoading ? "Creating Transaction..." : "Create Transaction"}
        </button>
      </form>
    </section>
  );
};

export default CreateTransactionForm;
