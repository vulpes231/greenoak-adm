/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, getAccessToken, liveurl, sendError } from "../constants";

const initialState = {
  createUserLoading: false,
  createUserError: false,
  userCreated: false,
  getUserLoading: false,
  getUserError: false,
  user: false,
  userInfoLoading: false,
  userInfoError: false,
  userInfo: false,
  deleteUserLoading: false,
  deleteUserError: false,
  userDeleted: false,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (formdata) => {
    const url = `${liveurl}/register`;
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
  const url = `${liveurl}/manageuser`;
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

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (userId) => {
    const url = `${liveurl}/manageuser/${userId}`;
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
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId) => {
    const url = `${liveurl}/manageuser/${userId}`;
    try {
      const accessToken = getAccessToken();
      const response = await axios.delete(url, {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateUser(state) {
      state.createUserError = false;
      state.createUserLoading = false;
      state.userCreated = false;
    },
    resetDeleteUser(state) {
      state.deleteUserError = false;
      state.deleteUserLoading = false;
      state.userDeleted = false;
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
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.userInfoLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfoLoading = false;
        state.userInfo = action.payload.userInfo;
        state.userInfoError = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.userInfoLoading = false;
        state.userInfo = false;
        state.userInfoError = action.error.message;
      });
    builder
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteUserLoading = false;
        state.userDeleted = true;
        state.deleteUserError = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserLoading = false;
        state.userDeleted = false;
        state.deleteUserError = action.error.message;
      });
  },
});

export const { resetCreateUser, resetDeleteUser } = userSlice.actions;
export default userSlice.reducer;
