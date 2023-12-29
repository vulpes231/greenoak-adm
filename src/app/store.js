import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "../features/createUserSlice";
import createTransReducer from "../features/createTransSlice";

const store = configureStore({
  reducer: {
    adduser: createUserReducer,
    createtrx: createTransReducer,
  },
});

export default store;
