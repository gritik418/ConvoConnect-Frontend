import authReducer from "@/features/auth/authSlice";
import userReducer from "@/features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
