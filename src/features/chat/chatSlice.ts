import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChats } from "./chatAPI";

const initialState = {
  chats: [],
  chatsLoading: false,
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
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatsAsync.pending, (state, action) => {
        state.chatsLoading = true;
      })
      .addCase(getChatsAsync.fulfilled, (state, action) => {
        state.chatsLoading = false;
        if (action.payload.success) {
          state.chats = action.payload.data.chats;
        }
      })
      .addCase(getChatsAsync.rejected, (state, action) => {
        state.chatsLoading = false;
      });
  },
});

export const { changeSelectedChat } = chatSlice.actions;

export const selectChats = (state: any) => state.chat.chats;
export const selectChatsLoading = (state: any) => state.chat.chatsLoading;
export const selectSelectedChat = (state: any) => state.chat.selectedChat;

export default chatSlice.reducer;
