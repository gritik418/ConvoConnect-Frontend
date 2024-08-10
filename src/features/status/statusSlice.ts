import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFriendStatus,
  getUserStatus,
  removeUserStatus,
  uploadStatus,
  UserStatusDataType,
} from "./statusAPI";
import { Bounce, toast } from "react-toastify";

const initialState = {
  uploadStatusLoading: false,
  removeStatusLoading: false,
  status: {},
  friendStatus: [],
};

export const getUserStatusAsync = createAsyncThunk(
  "status/getUserStatus",
  async () => {
    const response = await getUserStatus();
    return response;
  }
);

export const uploadStatusAsync = createAsyncThunk(
  "status/uploadStatus",
  async (data: UserStatusDataType) => {
    const response = await uploadStatus(data);
    return response;
  }
);

export const removeUserStatusAsync = createAsyncThunk(
  "status/removeUserStatus",
  async () => {
    const response = await removeUserStatus();
    return response;
  }
);

export const getFriendStatusAsync = createAsyncThunk(
  "status/getFriendStatus",
  async () => {
    const response = await getFriendStatus();
    return response;
  }
);

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadStatusAsync.pending, (state, action) => {
        state.uploadStatusLoading = true;
      })
      .addCase(uploadStatusAsync.fulfilled, (state, action) => {
        state.uploadStatusLoading = false;
        if (action.payload.status) {
          state.status = action.payload.status;
          toast.success(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .addCase(uploadStatusAsync.rejected, (state, action) => {
        state.uploadStatusLoading = false;
        toast.error("Something went wrong.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .addCase(getUserStatusAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.status = action.payload.data.status;
        }
      })
      .addCase(removeUserStatusAsync.pending, (state, action) => {
        state.removeStatusLoading = true;
      })
      .addCase(removeUserStatusAsync.fulfilled, (state, action) => {
        state.removeStatusLoading = false;
        if (action.payload.success) {
          state.status = {};
          toast.success(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .addCase(removeUserStatusAsync.rejected, (state, action) => {
        state.removeStatusLoading = false;
        toast.error("Something went wrong.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .addCase(getFriendStatusAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.friendStatus = action.payload.data.friends;
        }
      });
  },
});

export const selectUploadStatusLoading = (state: any) =>
  state.status.uploadStatusLoading;
export const selectStatus = (state: any) => state.status.status;
export const selectFriendStatus = (state: any) => state.status.friendStatus;
export const selectRemoveStatusLoading = (state: any) =>
  state.status.removeStatusLoading;

export default statusSlice.reducer;
