import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";

import { reset, createTrx } from "../features/createTransSlice";

const initialState = {
  sender: "",
  receiver: "",
  amount: "",
  desc: "",
  date: "",
  trx_type: "",
};

const CreateTransactionForm = () => {
  const dispatch = useDispatch();
  const [form, SetForm] = useState(initialState);

  const { trxLoading, trxError, trxSuccess } = useSelector(
    (state) => state.createtrx
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
    console.log(form);
    dispatch(createTrx(form));
  };

  useEffect(() => {
    if (trxSuccess) {
      resetInput();
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
  }, [dispatch, trxSuccess]);

  return (
    <section className="p-6 flex flex-col gap-6">
      <h3>Create Transaction</h3>
      <form
        action=""
        className="space-y-6 font-extralight"
        onSubmit={handleSubmit}
      >
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
          Receiver Account
          <Input
            placeHolder="Account No"
            value={form.receiver}
            handleOnChange={handleInputChange}
            name="receiver"
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
            placeHolder="Memo or Description"
            value={form.desc}
            handleOnChange={handleInputChange}
            name="desc"
          />
        </label>
        <label htmlFor="">
          Transaction Type
          <select
            name="trx_type"
            value={form.trx_type}
            onChange={handleInputChange}
            className="border-2 w-full py-2 px-2 md:py-3 outline-green-400 text-lg md:text-xl"
          >
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
        {trxError && <p className="text-red-500">{trxError}</p>}
        <button className="bg-green-700 px-2 py-3 w-full md:w-[250px] md:mx-auto text-white rounded-xl font-bold">
          {trxLoading ? "Creating Transaction..." : "Create Transaction"}
        </button>
      </form>
    </section>
  );
};

export default CreateTransactionForm;
