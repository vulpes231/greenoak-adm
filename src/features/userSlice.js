import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, getAccessToken, sendError } from "../constants";

const initialState = {
  createUserLoading: false,
  createUserError: false,
  userCreated: false,
  getUserLoading: false,
  getUserError: false,
  user: false,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (formdata) => {
    const url = `${devurl}/register`;
    try {
      const accessToken = getAccessToken();
      const response = await axios.post(url, formdata, {
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

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  const url = `${devurl}/user/all`;
  try {
    const accessToken = getAccessToken();
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateUser(state) {
      state.createUserError = false;
      state.createUserLoading = false;
      state.userCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.createUserLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUserLoading = false;
        state.userCreated = action.payload;
        state.createUserError = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserLoading = false;
        state.userCreated = false;
        state.createUserError = action.error.message;
      });
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getUserLoading = false;
        state.user = action.payload.users;
        state.getUserError = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.getUserLoading = false;
        state.user = false;
        state.getUserError = action.error.message;
      });
  },
});

export const { resetCreateUser } = userSlice.actions;
export default userSlice.reducer;
