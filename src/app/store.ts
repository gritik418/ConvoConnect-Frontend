import authReducer from "@/features/auth/authSlice";
import chatReducer from "@/features/chat/chatSlice";
import userReducer from "@/features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
  },
});

export default store;
