/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getAllUsers } from "../features/userSlice";
import { resetSendMail, sendMail } from "../features/mailSlice";
import Errormodal from "../components/Errormodal";
import Successmodal from "../components/Successmodal";
import Loadingmodal from "../components/Loadingmodal";

const Sendmail = ({ setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [form, setForm] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const { user } = useSelector((state) => state.user);
  const { mailSent, sendMailError, sendMailLoading } = useSelector(
    (state) => state.mail
  );

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (form[key] === "") {
        setError(`${key} required!`);
        return;
      }
    }

    dispatch(sendMail(form));
    console.log(form);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllUsers());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (sendMailError) {
      setError(sendMailError);
    }
  }, [sendMailError]);

  useEffect(() => {
    let timeout;
    if (mailSent) {
      timeout = setTimeout(() => {
        dispatch(resetSendMail());
        setForm({
          subject: "",
          email: "",
          message: "",
        });
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [mailSent, dispatch]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    setActive("sendmail");
    document.title = "RegentOak - Send Email";
  }, [setActive]);
  return (
    <div className="p-6">
      <h3>Send Email</h3>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-6">
        <select
          className="p-2"
          name="subject"
          onChange={handleInput}
          value={form.subject}
        >
          <option value="">Choose Subject</option>
          <option value="Deposit Alert">Deposit Alert</option>
          <option value="Withdraw Alert">Withdraw Alert</option>
          <option value="Transaction Notification">
            Transaction Notification
          </option>
          <option value="Attention Required">Attention Required</option>
        </select>
        <select
          className="p-2"
          name="email"
          onChange={handleInput}
          value={form.email}
        >
          <option value="">Choose Recipient</option>
          {user &&
            user.map((us) => {
              return (
                <option key={us._id} value={us.email}>
                  {us.email}
                </option>
              );
            })}
        </select>
        <textarea
          name="message"
          onChange={handleInput}
          value={form.message}
          className="border p-4 outline-none"
          rows={6}
          placeholder="Enter your message"
        ></textarea>
        <button
          type="submit"
          disabled={sendMailLoading}
          className="bg-green-600 text-white font-medium p-2 rounded-3xl"
        >
          Send Mail
        </button>
      </form>
      {error && <Errormodal text={error} />}
      {mailSent && <Successmodal text={"Mail sent."} />}
      {sendMailLoading && <Loadingmodal text={"Sending mail..."} />}
    </div>
  );
};

export default Sendmail;
