/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../features/userSlice";

const userStyles = {
  input: "p-2 border border-gray-300 rounded w-full",
  holder: "flex flex-col md:flex-row gap-6",
  card: "flex flex-col gap-1",
};

const Updateuser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(getUserInfo(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    document.title = "RegentOak - Admin UserProfile";
  }, []);
  return (
    <div className="p-6 h-screen overflow-auto">
      <h3 className="font-bold text-xl py-4">Update user </h3>
      <form action="" className="flex flex-col gap-6">
        <div className={userStyles.card}>
          <h3>Personal Information</h3>
          <div className={userStyles.holder}>
            <input
              className={userStyles.input}
              type="text"
              readOnly
              placeholder={userInfo?.username}
            />
            <input
              className={userStyles.input}
              type="text"
              readOnly
              placeholder={userInfo?.fullname}
            />
          </div>
          <div className={userStyles.holder}>
            <input
              className={userStyles.input}
              type="text"
              readOnly
              placeholder={userInfo?.gender}
            />
            <input
              className={userStyles.input}
              type="text"
              readOnly
              placeholder={userInfo?.dob}
            />
          </div>
        </div>
        <div className={userStyles.card}>
          <h3>Contact Information</h3>
          <div className={userStyles.holder}>
            <input
              className={userStyles.input}
              type="text"
              readOnly
              placeholder={userInfo?.phone}
            />
            <input
              className={userStyles.input}
              type="text"
              readOnly
              placeholder={userInfo?.email}
            />
          </div>
        </div>
        <div className={userStyles.card}>
          <h3>Address Information</h3>
          <div className={userStyles.holder}>
            <input
              className={userStyles.input}
              type="text"
              readOnly
              placeholder={userInfo?.address}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Updateuser;
