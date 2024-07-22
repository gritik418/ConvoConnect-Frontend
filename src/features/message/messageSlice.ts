import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages } from "./messageAPI";

const initialState = {
  messages: [],
  messageLoading: false,
};

export const getMessagesAsync = createAsyncThunk(
  "message/getMessages",
  async (id: string) => {
    const response = await getMessages(id);
    return response;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (state.messages.includes(action.payload.message as never)) return;
      state.messages.push(action.payload.message as never);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesAsync.pending, (state, action) => {
        state.messageLoading = true;
      })
      .addCase(getMessagesAsync.fulfilled, (state, action) => {
        state.messageLoading = false;
        if (action.payload.success) {
          state.messages = action.payload.data;
        }
      })
      .addCase(getMessagesAsync.rejected, (state, action) => {
        state.messageLoading = false;
        state.messageLoading = false;
      });
  },
});

export const { addMessage } = messageSlice.actions;

export const selectMessages = (state: any) => state.message.messages;
export const selectMessageLoading = (state: any) =>
  state.message.messageLoading;

export default messageSlice.reducer;
