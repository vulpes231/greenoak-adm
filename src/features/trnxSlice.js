import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, getAccessToken, sendError } from "../constants";

const initialState = {
  createTrxLoading: false,
  createTrxError: false,
  createTrxSuccess: false,
  getTrxLoading: false,
  getTrxError: false,
  trnxs: false,
};

export const createTrxn = createAsyncThunk(
  "trnx/createTrxn",
  async (formData) => {
    const url = `${devurl}/transaction/admin`;
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

export const getAllTrnxs = createAsyncThunk("trnx/getAllTrnxs", async () => {
  const url = `${devurl}/transaction/admin`;
  const accessToken = getAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

const trnxSlice = createSlice({
  name: "trnx",
  initialState,
  reducers: {
    resetCreateTrnx(state) {
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
      .addCase(createTrxn.fulfilled, (state) => {
        state.createTrxLoading = false;
        state.createTrxSuccess = true;
        state.createTrxError = false;
      })
      .addCase(createTrxn.rejected, (state, action) => {
        state.createTrxLoading = false;
        state.createTrxSuccess = false;
        state.createTrxError = action.error.message;
      });
    builder
      .addCase(getAllTrnxs.pending, (state) => {
        state.getTrxLoading = true;
      })
      .addCase(getAllTrnxs.fulfilled, (state, action) => {
        state.getTrxLoading = false;
        state.trnxs = action.payload.transactions;
        state.getTrxError = false;
      })
      .addCase(getAllTrnxs.rejected, (state, action) => {
        state.getTrxLoading = false;
        state.trnxs = false;
        state.getTrxError = action.error.message;
      });
  },
});

export const { resetCreateTrnx } = trnxSlice.actions;
export default trnxSlice.reducer;
