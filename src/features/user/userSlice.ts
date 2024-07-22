import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
