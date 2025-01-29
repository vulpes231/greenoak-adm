/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customStyles, getAccessToken } from "../constants";
import { FaUser, FaMoneyBillWave, FaUserCheck } from "react-icons/fa";
import { getAllUsers } from "../features/userSlice";
import { getAllTrnxs } from "../features/trnxSlice";

const dashStyles = {
  card: "bg-white p-8 shadow rounded-sm flex flex-col items-center justify-center gap-3",
  span: "flex flex-col items-center gap-2",
  title: "text-xl font-semibold",
  count: "text-3xl font-bold",
};

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = getAccessToken();

  const { user } = useSelector((state) => state.user);
  const { trnxs } = useSelector((state) => state.trnx);

  useEffect(() => {
    if (!accessToken) {
      sessionStorage.clear();
      navigate("/");
    } else {
      dispatch(getAllUsers());
      dispatch(getAllTrnxs());
    }
  }, [accessToken, navigate, dispatch]);
  return (
    <section className=" bg-slate-200 text-slate-900 h-screen w-full">
      <div className="p-10 flex flex-col gap-6">
        <h3 className={customStyles.title}>Dashboard</h3>
        <div className="grid grid-cols-3 gap-6">
          <Link to={"/user"} className={dashStyles.card}>
            <span className={dashStyles.span}>
              <FaUserCheck size={30} />
              <h1 className={dashStyles.title}> Users</h1>
            </span>
            <h1 className={dashStyles.count}>{user?.length || 0}</h1>
          </Link>
          <Link to={"/transaction"} className={dashStyles.card}>
            <span className={dashStyles.span}>
              <FaMoneyBillWave size={30} />
              <h1 className={dashStyles.title}>Transactions</h1>
            </span>
            <h1 className={dashStyles.count}>{trnxs?.length || 0}</h1>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
