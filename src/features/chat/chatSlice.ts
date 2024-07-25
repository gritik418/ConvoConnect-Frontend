import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  CreateGroupDataType,
  getChatById,
  getChats,
} from "./chatAPI";
import { Bounce, toast } from "react-toastify";

const initialState = {
  chats: [],
  chatsLoading: false,
  selectedChat: {},
  selectedChatLoading: false,
  errors: {},
  createGroupLoading: false,
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

export const createGroupChatAsync = createAsyncThunk(
  "chat/createGroupChat",
  async (data: CreateGroupDataType) => {
    const response = await createGroup(data);
    return response;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeSelectedChat: (state, action) => {
      state.selectedChatLoading = true;
      state.selectedChat = action.payload;
      state.selectedChatLoading = false;
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
          state.chats = action.payload.data.chats.toSorted(
            (a: ChatType, b: ChatType) => {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            }
          );
        }
      })
      .addCase(getChatsAsync.rejected, (state, action) => {
        state.chatsLoading = false;
      })
      .addCase(getChatByIdAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.selectedChat = action.payload.data;
        }
      })
      .addCase(createGroupChatAsync.pending, (state, action) => {
        state.createGroupLoading = true;
      })
      .addCase(createGroupChatAsync.fulfilled, (state, action) => {
        state.createGroupLoading = false;
        if (action.payload.success) {
          toast.success(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          if (action.payload.errors) {
            state.errors = action.payload.errors;
          }
          toast.error(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .addCase(createGroupChatAsync.rejected, (state, action) => {
        state.createGroupLoading = false;
        toast.error("Something went wrong.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  },
});

export const { changeSelectedChat, updateLastMessage } = chatSlice.actions;

export const selectChats = (state: any) => state.chat.chats;
export const selectChatsLoading = (state: any) => state.chat.chatsLoading;
export const selectSelectedChat = (state: any) => state.chat.selectedChat;
export const selectSelectedChatLoading = (state: any) =>
  state.chat.selectedChatLoading;
export const selectCreateGroupLoading = (state: any) =>
  state.chat.createGroupLoading;
export const selectCreateGroupErrors = (state: any) => state.chat.errors;

export default chatSlice.reducer;
