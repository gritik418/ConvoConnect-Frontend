import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  CreateGroupDataType,
  getChatById,
  getChats,
  updateGroupInfo,
  UpdateGroupInfoDataType,
} from "./chatAPI";
import { Bounce, toast } from "react-toastify";

const initialState = {
  chats: {},
  chatsLoading: false,
  selectedChat: {},
  selectedChatLoading: false,
  errors: {},
  createGroupLoading: false,
  updateGroupLoading: false,
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

export const updateGroupInfoAsync = createAsyncThunk(
  "chat/updateGroupInfo",
  async (data: UpdateGroupInfoDataType) => {
    const response = await updateGroupInfo(data);
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
      state.chats = Object.values(state.chats).map((chat: ChatType | any) => {
        if (chat._id === action.payload.chat_id) {
          return { ...chat, last_message: action.payload } as never;
        } else {
          return chat as never;
        }
      });
    },
    addNewChat: (state: { chats: any }, action) => {
      state.chats[action.payload._id] = action.payload;
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
      })
      .addCase(updateGroupInfoAsync.pending, (state, action) => {
        state.updateGroupLoading = true;
      })
      .addCase(updateGroupInfoAsync.fulfilled, (state, action) => {
        state.updateGroupLoading = false;
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
      .addCase(updateGroupInfoAsync.rejected, (state, action) => {
        state.updateGroupLoading = false;
      });
  },
});

export const { changeSelectedChat, updateLastMessage, addNewChat } =
  chatSlice.actions;

export const selectChats = (state: any) => state.chat.chats;
export const selectChatsLoading = (state: any) => state.chat.chatsLoading;
export const selectSelectedChat = (state: any) => state.chat.selectedChat;
export const selectSelectedChatLoading = (state: any) =>
  state.chat.selectedChatLoading;
export const selectCreateGroupLoading = (state: any) =>
  state.chat.createGroupLoading;
export const selectCreateGroupErrors = (state: any) => state.chat.errors;
export const selectUpdateGroupLoading = (state: any) =>
  state.chat.updateGroupLoading;

export default chatSlice.reducer;
