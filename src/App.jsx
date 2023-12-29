import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import CreateUserForm from "./pages/CreateUserForm";
// import createTransactionForm from "./pages/createTransactionForm";
import CreateTransactionForm from "./pages/createTransactionForm";
// createTransac

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create-user" element={<CreateUserForm />} />
        <Route path="/create-transaction" element={<CreateTransactionForm />} />
      </Routes>
    </div>
  );
};

export default App;
