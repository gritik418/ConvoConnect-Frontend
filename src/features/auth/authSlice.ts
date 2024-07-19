import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup, verifyUserEmail } from "./authAPI";
import { LoginDataType } from "@/validators/loginValidator";
import { SignUpDataType } from "@/validators/signupValidator";

const initialState = {
  loginLoading: false,
  signupLoading: false,
  isLoggedIn: false,
  email: "",
  isVerified: false,
  verifyMessage: "",
};

export const userLoginAsync = createAsyncThunk(
  "auth/userLogin",
  async (data: LoginDataType) => {
    const response = await userLogin(data);
    return response;
  }
);

export const userSignupAsync = createAsyncThunk(
  "auth/userSignup",
  async (data: SignUpDataType) => {
    const response = await userSignup(data);
    return response;
  }
);

export const verifyUserEmailAsync = createAsyncThunk(
  "auth/verifyUserEmail",
  async ({ id, secretToken }: { id: string; secretToken: string }) => {
    const response = await verifyUserEmail(id, secretToken);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsync.pending, (state, action) => {
        state.loginLoading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        if (action.payload.success) {
          state.isLoggedIn = true;
        }
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(userSignupAsync.pending, (state, action) => {
        state.signupLoading = true;
      })
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        state.signupLoading = false;
        if (action.payload.success) {
          state.email = action.payload.email;
        }
      })
      .addCase(userSignupAsync.rejected, (state, action) => {
        state.signupLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(verifyUserEmailAsync.fulfilled, (state, action) => {
        state.verifyMessage = action.payload.message;
        if (action.payload.success) {
          state.isVerified = true;
        }
      })
      .addCase(verifyUserEmailAsync.rejected, (state, action) => {
        state.isVerified = false;
        state.verifyMessage = "Verification Failed.";
      });
  },
});

export const selectLoginLoading = (state: any) => state.auth.loginLoading;
export const selectSignupLoading = (state: any) => state.auth.signupLoading;
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectUserEmail = (state: any) => state.auth.email;
export const selectIsVerified = (state: any) => state.auth.isVerified;
export const selectVerifyMessage = (state: any) => state.auth.verifyMessage;

export default authSlice.reducer;
