/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { customStyles, getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/userSlice";

const Users = ({ setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { user, getUserError, getUserLoading } = useSelector(
    (state) => state.user
  );

  console.log(user);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllUsers());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setActive("users");
    document.title = "RegentOak - Users";
  }, []);
  return (
    <section className=" bg-slate-200 text-slate-900 h-screen w-full">
      <div className="p-10 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h3 className={customStyles.title}>Users</h3>
          <button className="bg-green-600 text-white rounded-3xl px-6 py-2">
            Create user
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className={customStyles.td}>username</th>
              <th className={customStyles.td}>email</th>
              <th className={customStyles.td}>phone</th>
              <th className={customStyles.td}>gender</th>
              <th className={customStyles.td}>action</th>
            </tr>
          </thead>
        </table>
      </div>
    </section>
  );
};

export default Users;
