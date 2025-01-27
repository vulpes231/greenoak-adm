/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customStyles, getAccessToken } from "../constants";
import { FaUser, FaMoneyBillWave, FaUserCheck } from "react-icons/fa";

const dashStyles = {
  card: "bg-white p-8 shadow rounded-sm flex flex-col items-center justify-center gap-3",
  span: "flex flex-col items-center gap-2",
  title: "text-xl font-semibold",
  count: "text-3xl font-bold",
};

const Landing = () => {
  const navigate = useNavigate();

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      sessionStorage.clear();
      navigate("/");
    }
  }, [accessToken, navigate]);
  return (
    <section className=" bg-slate-200 text-slate-900 h-screen w-full">
      <div className="p-10 flex flex-col gap-6">
        <h3 className={customStyles.title}>Dashboard</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className={dashStyles.card}>
            <span className={dashStyles.span}>
              <FaUserCheck />
              <h1 className={dashStyles.title}> Users</h1>
            </span>
            <h1 className={dashStyles.count}>0</h1>
          </div>
          <div className={dashStyles.card}>
            <span className={dashStyles.span}>
              <FaMoneyBillWave />
              <h1 className={dashStyles.title}>Transactions</h1>
            </span>
            <h1 className={dashStyles.count}>0</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
