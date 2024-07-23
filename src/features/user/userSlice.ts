import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userAPI";

const initialState = {
  user: {},
  userLoading: false,
};

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  const response = await getUser();
  return response;
});

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
      });
  },
});

export const selectUser = (state: any) => state.user.user;
export const selectUserLoading = (state: any) => state.user.userLoading;

export default userSlice.reducer;
