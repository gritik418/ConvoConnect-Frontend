import authReducer from "@/features/auth/authSlice";
import friendReducer from "@/features/friend/friendSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
  },
});

export default store;
