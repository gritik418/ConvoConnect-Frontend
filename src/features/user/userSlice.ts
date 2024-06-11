import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userAPI";

export type UserDataType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
};

const initialState = {
  user: <UserDataType>{},
};

export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (state, action) => {
    const response = await getUser();
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state, action) => {})
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        console.log(action.payload);
      })
      .addCase(getUserAsync.rejected, (state, action) => {});
  },
});

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
