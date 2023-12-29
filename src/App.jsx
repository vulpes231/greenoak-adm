import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import CreateUserForm from "./pages/CreateUserForm";
import CreateTransactionForm from "./pages/createTransactionForm";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create-user" element={<CreateUserForm />} />
        <Route path="/create-transaction" element={<CreateTransactionForm />} />
        <Route path="/get-users" element={<Users />} />
        <Route path="/get-transactions" element={<Transactions />} />
      </Routes>
    </div>
  );
};

export default App;
