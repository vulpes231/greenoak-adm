import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  addLoading: false,
  addError: false,
  addSuccess: false,
};

export const createUser = createAsyncThunk(
  "adduser/createUser",
  async (form) => {
    const url = `${liveurl}/register`;
    try {
      const response = await axios.post(url, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || error.response.data;
        throw new Error(errorMessage);
      } else {
        throw error;
      }
    }
  }
);

const createUserSlice = createSlice({
  name: "adduser",
  initialState,
  reducers: {
    reset(state) {
      state.addError = false;
      state.addLoading = false;
      state.addSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addSuccess = action.payload;
        state.addError = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.addLoading = false;
        state.addSuccess = false;
        state.addError = action.payload;
      });
  },
});

export const { reset } = createUserSlice.actions;
export default createUserSlice.reducer;
