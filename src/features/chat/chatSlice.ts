import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChatById, getChats } from "./chatAPI";

const initialState = {
  chats: [],
  chatsLoading: false,
  selectedChat: {},
};

export const getChatsAsync = createAsyncThunk("chat/getChats", async () => {
  const response = await getChats();
  return response;
});

export const getChatByIdAsync = createAsyncThunk(
  "chat/getChatById",
  async (id: string) => {
    const response = await getChatById(id);
    return response;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    updateLastMessage: (state, action) => {
      state.chats = state.chats.map((chat: ChatType) => {
        if (chat._id === action.payload.chat_id) {
          return { ...chat, last_message: action.payload } as never;
        } else {
          return chat as never;
        }
      });
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
      })
      .addCase(getChatByIdAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.selectedChat = action.payload.data;
        }
      });
  },
});

export const { changeSelectedChat, updateLastMessage } = chatSlice.actions;

export const selectChats = (state: any) => state.chat.chats;
export const selectChatsLoading = (state: any) => state.chat.chatsLoading;
export const selectSelectedChat = (state: any) => state.chat.selectedChat;

export default chatSlice.reducer;