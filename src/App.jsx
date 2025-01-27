/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import CreateUserForm from "./pages/CreateUserForm";
import CreateTransactionForm from "./pages/createTransactionForm";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import EnrollAdmin from "./pages/EnrollAdmin";
import Sidebar from "./components/Sidebar";
import { getAccessToken } from "./constants";

const App = () => {
  const [active, setActive] = useState("dashboard");
  const token = getAccessToken();
  return (
    <div className="flex flex-row w-full">
      {token && <Sidebar active={active} setActive={setActive} />}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dash" element={<Landing />} />
          <Route path="/new-admin" element={<EnrollAdmin />} />
          {/* <Route path="/create-user" element={<CreateUserForm />} />
        <Route path="/create-transaction" element={<CreateTransactionForm />} /> */}
          <Route path="/user" element={<Users setActive={setActive} />} />
          <Route
            path="/transaction"
            element={<Transactions setActive={setActive} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
