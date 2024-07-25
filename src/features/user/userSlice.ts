import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, updateUser, UpdateUserDataType } from "./userAPI";
import { Bounce, toast } from "react-toastify";

const initialState = {
  user: {},
  userLoading: false,
  userUpdateLoading: false,
};

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  const response = await getUser();
  return response;
});

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userData: UpdateUserDataType) => {
    const response = await updateUser(userData);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.data;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.userLoading = false;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.userUpdateLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.userUpdateLoading = false;
        if (action.payload.success) {
          state.user = action.payload.data;
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
      .addCase(updateUserAsync.rejected, (state) => {
        state.userUpdateLoading = false;
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
      });
  },
});

export const selectUser = (state: any) => state.user.user;
export const selectUserLoading = (state: any) => state.user.userLoading;
export const selectUpdateUserLoading = (state: any) =>
  state.user.userUpdateLoading;

export default userSlice.reducer;
