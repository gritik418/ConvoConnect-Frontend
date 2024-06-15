import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChats } from "./chatAPI";

const initialState = {
  chats: [],
  selectedChat: {},
};

export const getChatsAsync = createAsyncThunk("chat/getChats", async () => {
  const response = await getChats();
  return response;
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeSelectedChat: (state, action) => {
      state.selectedChat = action.payload.chat;
    },
  },
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

export const { changeSelectedChat } = chatSlice.actions;

export const selectChats = (state: any) => state.chat.chats;
export const selectSelectedChat = (state: any) => state.chat.selectedChat;

export default chatSlice.reducer;
