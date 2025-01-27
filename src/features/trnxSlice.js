import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, getAccessToken, sendError } from "../constants";

const initialState = {
  createTrxLoading: false,
  createTrxError: false,
  createTrxSuccess: false,
};

export const createTrxn = createAsyncThunk(
  "trnx/createTrxn",
  async (formData) => {
    const url = `${devurl}/transaction`;
    const accessToken = getAccessToken();

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const trnxSlice = createSlice({
  name: "trnx",
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
      .addCase(createTrxn.pending, (state) => {
        state.createTrxLoading = true;
      })
      .addCase(createTrxn.fulfilled, (state, action) => {
        state.createTrxLoading = false;
        state.createTrxSuccess = action.payload.trnxs;
        state.createTrxError = false;
      })
      .addCase(createTrxn.rejected, (state, action) => {
        state.createTrxLoading = false;
        state.createTrxSuccess = false;
        state.createTrxError = action.error.message;
      });
  },
});

export const { reset } = trnxSlice.actions;
export default trnxSlice.reducer;
