import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import CreateUserForm from "./pages/CreateUserForm";
import CreateTransactionForm from "./pages/createTransactionForm";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import EnrollAdmin from "./pages/EnrollAdmin";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Landing />} />
        <Route path="/new-admin" element={<EnrollAdmin />} />
        <Route path="/create-user" element={<CreateUserForm />} />
        <Route path="/create-transaction" element={<CreateTransactionForm />} />
        <Route path="/get-users" element={<Users />} />
        <Route path="/get-transactions" element={<Transactions />} />
      </Routes>
    </div>
  );
};

export default App;
