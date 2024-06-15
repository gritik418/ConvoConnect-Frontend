import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages } from "./messageAPI";

export type MessageType = {
  chatId: string;
  content: string;
  createdAt: string;
  sender: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

const initialState = {
  messages: [],
};

export const getMessagesAsync = createAsyncThunk(
  "message/getmessages",
  async (chatId: string) => {
    const response = await getMessages(chatId);
    return response;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload] as never;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesAsync.pending, (state, action) => {})
      .addCase(getMessagesAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.messages = action.payload.messages;
        }
      })
      .addCase(getMessagesAsync.rejected, (state, action) => {});
  },
});

export const { addMessage } = messageSlice.actions;

export const selectMessages = (state: any) => state.message.messages;

export default messageSlice.reducer;
