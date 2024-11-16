import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  acceptFriendRequest,
  declineFriendRequest,
  getActiveFriends,
  getFriendRequests,
  getFriends,
  searchUsers,
  sendFriendRequest,
} from "./friendAPI";
import { Bounce, toast } from "react-toastify";

const initialState = {
  friendRequests: [],
  searchedUsers: [],
  activeFriends: [],
  friends: [],
  friendsLoading: false,
  friendRequestsCount: 0,
};

export const getFriendsAsync = createAsyncThunk(
  "friend/getFriends",
  async () => {
    const response = await getFriends();
    return response;
  }
);

export const getActiveFriendsAsync = createAsyncThunk(
  "friend/getActiveFriends",
  async () => {
    const response = await getActiveFriends();
    return response;
  }
);

export const searchUsersAsync = createAsyncThunk(
  "friend/searchUsers",
  async (searchQuery: string) => {
    const response = await searchUsers(searchQuery);
    return response;
  }
);

export const getFriendRequestsAsync = createAsyncThunk(
  "friend/getFriendRequests",
  async () => {
    const response = await getFriendRequests();
    return response;
  }
);

export const sendFriendRequestAsync = createAsyncThunk(
  "friend/sendFriendRequest",
  async (id: string) => {
    const response = await sendFriendRequest(id);
    return response;
  }
);

export const acceptFriendRequestAsync = createAsyncThunk(
  "friend/acceptFriendRequest",
  async (id: string) => {
    const response = await acceptFriendRequest(id);
    return response;
  }
);

export const declineFriendRequestAsync = createAsyncThunk(
  "friend/declineFriendRequest",
  async (id: string) => {
    const response = await declineFriendRequest(id);
    return response;
  }
);

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    onlineFriend: (state, action) => {
      if (!state.activeFriends.includes(action.payload as never)) {
        state.activeFriends.push(action.payload as never);
      }
    },
    offlineFriend: (state, action) => {
      if (state.activeFriends.includes(action.payload as never)) {
        state.activeFriends = state.activeFriends.filter((friend: string) => {
          return friend !== action.payload;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsAsync.pending, (state, action) => {
        state.friendsLoading = true;
      })
      .addCase(getFriendsAsync.fulfilled, (state, action) => {
        state.friendsLoading = false;
        if (action.payload.success) {
          state.friends = action.payload.data.friends;
        }
      })
      .addCase(getFriendsAsync.rejected, (state, action) => {
        state.friendsLoading = false;
      })
      .addCase(getActiveFriendsAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          action.payload.data.activeFriends.map((activeUser: string) => {
            if (state.activeFriends.includes(activeUser as never)) {
              return;
            } else {
              state.activeFriends.push(activeUser as never);
            }
          });
        }
      })
      .addCase(searchUsersAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          console.log(action.payload.data);
          state.searchedUsers = action.payload.data.searchResult;
        }
      })
      .addCase(getFriendRequestsAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.friendRequests = action.payload.data.friend_requests;
          state.friendRequestsCount =
            action.payload.data.friend_requests.length;
        }
      })
      .addCase(sendFriendRequestAsync.fulfilled, (state, action) => {
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
        }
      })
      .addCase(acceptFriendRequestAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.friendRequests = state.friendRequests.filter((req: any) => {
            return req._id.toString() !== action.payload.id;
          });
        }
      })
      .addCase(declineFriendRequestAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.friendRequests = state.friendRequests.filter((req: any) => {
            return req._id.toString() !== action.payload.id;
          });
        }
      });
  },
});

export const { onlineFriend, offlineFriend } = friendSlice.actions;

export const selectFriendRequests = (state: any) => state.friend.friendRequests;
export const selectFriendRequestsCount = (state: any) =>
  state.friend.friendRequestsCount;
export const selectSearchedUsers = (state: any) => state.friend.searchedUsers;
export const selectActiveFriends = (state: any) => state.friend.activeFriends;
export const selectFriends = (state: any) => state.friend.friends;
export const selectFriendsLoading = (state: any) => state.friend.friendsLoading;

export default friendSlice.reducer;
