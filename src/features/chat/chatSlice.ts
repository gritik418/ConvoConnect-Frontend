import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChats } from "./chatAPI";

const initialState = {
  chats: [],
};

export const getChatsAsync = createAsyncThunk("chat/getChats", async () => {
  const response = await getChats();
  return response;
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatsAsync.pending, (state, action) => {})
      .addCase(getChatsAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.chats = action.payload.chats;
        }
      })
      .addCase(getChatsAsync.rejected, (state, action) => {});
  },
});

export const selectChats = (state: any) => state.chat.chats;

export default chatSlice.reducer;
