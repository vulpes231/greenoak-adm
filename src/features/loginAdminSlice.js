/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, liveurl, sendError } from "../constants";

const initialState = {
  loginError: false,
  loginLoading: false,
  accessToken: null,
};

export const adminSignin = createAsyncThunk(
  "loginadmin/adminSignin",
  async (formData) => {
    const url = `${devurl}/signin/admin`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const loginAdmin = createSlice({
  name: "signin",
  initialState,
  reducers: {
    resetLogin(state) {
      state.loginError = false;
      state.loginLoading = false;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminSignin.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(adminSignin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(adminSignin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message;
        state.accessToken = null;
      });
  },
});

export const { resetLogin } = loginAdmin.actions;
export default loginAdmin.reducer;
