import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "../features/createUserSlice";
import createTransReducer from "../features/createTransSlice";
import loginAdminReducer from "../features/loginAdminSlice";

const store = configureStore({
  reducer: {
    adduser: createUserReducer,
    createtrx: createTransReducer,
    loginadmin: loginAdminReducer,
  },
});

export default store;
