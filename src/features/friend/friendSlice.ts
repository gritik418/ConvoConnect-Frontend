import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  acceptFriendRequest,
  declineFriendRequest,
  searchUsers,
  sendFriendRequest,
} from "./friendAPI";

const initialState = {
  searchLoading: false,
  searchedUsers: [],
};

export const searchUsersAsync = createAsyncThunk(
  "friend/searchUser",
  async (searchQuery: string) => {
    const response = await searchUsers(searchQuery);
    return response;
  }
);

export const sendFriendRequestAsync = createAsyncThunk(
  "friend/sendFriendRequest",
  async (receiverId: string) => {
    const response = await sendFriendRequest(receiverId);
    return response;
  }
);

export const acceptFriendRequestAsync = createAsyncThunk(
  "friend/acceptFriendRequest",
  async (senderId: string) => {
    const response = await acceptFriendRequest(senderId);
    return response;
  }
);

export const declineFriendRequestAsync = createAsyncThunk(
  "friend/declineFriendRequest",
  async (senderId: string) => {
    const response = await declineFriendRequest(senderId);
    return response;
  }
);

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersAsync.pending, (state, action) => {
        state.searchLoading = true;
      })
      .addCase(searchUsersAsync.fulfilled, (state, action) => {
        state.searchLoading = false;
        if (action.payload.success) {
          state.searchedUsers = action.payload.users;
        }
      })
      .addCase(searchUsersAsync.rejected, (state, action) => {
        state.searchLoading = false;
      })
      .addCase(sendFriendRequestAsync.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(acceptFriendRequestAsync.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(declineFriendRequestAsync.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const selectSearchLoading = (state: any) => state.friend.searchLoading;
export const selectSearchedUsers = (state: any) => state.friend.searchedUsers;

export default friendSlice.reducer;
