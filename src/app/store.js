import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";
import trnxSlice from "../features/trnxSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    trnx: trnxSlice,
    signin: loginReducer,
  },
});

export default store;
