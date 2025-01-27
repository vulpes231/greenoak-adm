/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { customStyles, getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrnxs } from "../features/trnxSlice";

const Transactions = ({ setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { trnxs, getTrnxError, getTrnxLoading } = useSelector(
    (state) => state.trnx
  );

  console.log(trnxs);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllTrnxs());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setActive("transactions");
    document.title = "RegentOak - Transactions";
  }, []);
  return (
    <section className=" bg-slate-200 text-slate-900 h-screen w-full">
      <div className="p-10 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h3 className={customStyles.title}>Transactions</h3>
          <button className="bg-green-600 text-white rounded-3xl px-6 py-2">
            Create Transaction
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className={customStyles.td}>date</th>
              <th className={customStyles.td}>amount</th>
              <th className={customStyles.td}>type</th>
              <th className={customStyles.td}>email</th>
              <th className={customStyles.td}>action</th>
            </tr>
          </thead>
        </table>
      </div>
    </section>
  );
};

export default Transactions;
