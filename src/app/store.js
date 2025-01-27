import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";
import trnxReducer from "../features/trnxSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    trnx: trnxReducer,
    signin: loginReducer,
  },
});

export default store;
