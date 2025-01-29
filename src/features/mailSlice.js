import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devurl, getAccessToken, sendError } from "../constants";
import axios from "axios";

const initialState = {
  sendMailLoading: false,
  sendMailError: false,
  mailSent: false,
};

export const sendMail = createAsyncThunk("mail/sendMail", async (formData) => {
  try {
    const url = `${devurl}/otp`;
    const accessToken = getAccessToken();
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
});

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    resetSendMail(state) {
      state.sendMailLoading = false;
      state.sendMailError = false;
      state.mailSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMail.pending, (state) => {
        state.sendMailLoading = true;
      })
      .addCase(sendMail.fulfilled, (state) => {
        state.sendMailLoading = false;
        state.sendMailError = false;
        state.mailSent = true;
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.sendMailLoading = false;
        state.sendMailError = action.error.message;
        state.mailSent = false;
      });
  },
});

export default mailSlice.reducer;
export const { resetSendMail } = mailSlice.actions;
