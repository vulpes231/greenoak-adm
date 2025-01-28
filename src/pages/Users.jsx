/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { customStyles, getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Deleteuser from "../components/Deleteuser";

const Users = ({ setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const navigate = useNavigate();

  const [action, setAction] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const { user, getUserError, getUserLoading } = useSelector(
    (state) => state.user
  );

  const handleAction = (e, userId) => {
    setAction(e.target.value);
    setUserId(userId);
  };

  useEffect(() => {
    if (action === "edit" && userId) {
      console.log("edit", userId);
      navigate(`/update/${userId}`);
      setUserId("");
      setAction("");
    } else if (action === "delete" && userId) {
      console.log("delete", userId);
      setDeleteModal(true);
    }
  }, [action, navigate, userId]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllUsers());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setActive("users");
    document.title = "RegentOak - Users";
  }, [setActive]);

  if (getUserLoading) {
    return <div className="p-10">Fetching users...</div>;
  }
  return (
    <section className=" bg-slate-200 text-slate-900 h-screen w-full">
      <div className="p-10 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h3 className={customStyles.title}>Users</h3>
          <Link
            to={"/create-user"}
            className="bg-green-600 text-white rounded-3xl px-6 py-2"
          >
            Create user
          </Link>
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
          <tbody>
            {user &&
              user.map((us) => {
                return (
                  <tr key={us._id}>
                    <td className={customStyles.th}>{us.username}</td>
                    <td className={customStyles.th}>{us.email}</td>
                    <td className={customStyles.th}>{us.phone}</td>
                    <td className={customStyles.th}>{us.gender}</td>
                    <td className={customStyles.th}>
                      <select
                        onChange={(e) => handleAction(e, us._id)}
                        className="flex items-center p-2 text-xs capitalize"
                      >
                        <option value="">action</option>
                        <option value="edit">view</option>
                        <option value="delete">delete</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {deleteModal && (
          <Deleteuser
            userId={userId}
            setModal={setDeleteModal}
            setId={setUserId}
            setAction={setAction}
          />
        )}
      </div>
    </section>
  );
};

export default Users;
