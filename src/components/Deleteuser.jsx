/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../features/userSlice";

const Deleteuser = ({ userId, setModal, setAction, setId }) => {
  const dispatch = useDispatch();

  const { deleteUserError, deleteUserLoading, userDeleted } = useSelector(
    (state) => state.user
  );

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUser(userId));
  };

  const closeModal = () => {
    setModal(false);
    setAction("");
    setId("");
  };

  useEffect(() => {
    let timeout;
    if (userDeleted) {
      timeout = setTimeout(() => {
        setModal(false);
        window.location.reload();
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [userDeleted, setModal]);

  return (
    <div className="fixed top-[30px] right-5 bg-white shadow rounded-md flex flex-col gap-4 p-7 w-[280px]">
      <h3 className="text-center text-xl font-semibold">Confirm delete!</h3>
      {deleteUserError && (
        <p className="text-red-500 text-sm font-light">{deleteUserError}</p>
      )}
      {userDeleted && (
        <p className="text-green-500 text-sm font-light">User deleted.</p>
      )}
      <span className="flex items-center justify-between gap-6 w-full ">
        <button
          onClick={handleDelete}
          className="bg-green-600 py-2 px-5 rounded-3xl text-white"
        >
          {deleteUserLoading ? "Wait..." : "Yes"}
        </button>
        <button
          onClick={closeModal}
          className="bg-red-600 py-2 px-5 rounded-3xl text-white"
        >
          No
        </button>
      </span>
    </div>
  );
};

export default Deleteuser;
