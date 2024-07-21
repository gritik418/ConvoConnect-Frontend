import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages } from "./messageAPI";

const initialState = {
  messages: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessagesAsync.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.messages = action.payload.data;
      }
    });
  },
});

export const selectMessages = (state: any) => state.message.messages;

export default messageSlice.reducer;
