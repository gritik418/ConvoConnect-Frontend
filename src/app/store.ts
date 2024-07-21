import authReducer from "@/features/auth/authSlice";
import chatReducer from "@/features/chat/chatSlice";
import friendReducer from "@/features/friend/friendSlice";
import messageReducer from "@/features/message/messageSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});

export default store;
