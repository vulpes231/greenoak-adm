import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";
import trnxReducer from "../features/trnxSlice";
import mailReducer from "../features/mailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    trnx: trnxReducer,
    signin: loginReducer,
    mail: mailReducer,
  },
});

export default store;
