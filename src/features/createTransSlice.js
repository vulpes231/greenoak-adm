import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  trxLoading: false,
  trxError: false,
  trxSuccess: false,
};

export const createTrx = createAsyncThunk(
  "createtrx/createTrx",
  async (form) => {
    const url = `${liveurl}/transaction`;
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

const createTransactionSlice = createSlice({
  name: "createtrx",
  initialState,
  reducers: {
    reset(state) {
      state.trxError = false;
      state.trxLoading = false;
      state.trxSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrx.pending, (state) => {
        state.trxLoading = true;
      })
      .addCase(createTrx.fulfilled, (state, action) => {
        state.trxLoading = false;
        state.trxSuccess = action.payload;
        state.trxError = false;
      })
      .addCase(createTrx.rejected, (state, action) => {
        state.trxLoading = false;
        state.trxSuccess = false;
        state.trxError = action.payload;
      });
  },
});

export const { reset } = createTransactionSlice.actions;
export default createTransactionSlice.reducer;
