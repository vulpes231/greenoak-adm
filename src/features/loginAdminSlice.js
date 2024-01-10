import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loginError: false,
  loginLoading: false,
  accessToken: null,
};

export const adminSignin = createAsyncThunk(
  "loginadmin/adminSignin",
  async (form) => {
    const url = ``;

    try {
      const response = await axios.post(url, form, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
        throw error;
      }
    }
  }
);

const loginAdmin = createSlice({
  name: "loginadmin",
  initialState,
  reducers: {
    reset(state) {
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
        state.accessToken = action.payload;
      })
      .addCase(adminSignin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message;
        state.accessToken = null;
      });
  },
});

export const { reset } = loginAdmin.actions;
export default loginAdmin.reducer;
