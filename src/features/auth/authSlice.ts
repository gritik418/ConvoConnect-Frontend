import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogout, userSignup, verifyUserEmail } from "./authAPI";
import { LoginDataType } from "@/validators/loginValidator";
import { SignUpDataType } from "@/validators/signupValidator";
import { Bounce, toast } from "react-toastify";

const initialState = {
  loginLoading: false,
  signupLoading: false,
  isLoggedIn: false,
  email: "",
  isVerified: false,
  verifyMessage: "",
  cookie: null,
  authFailed: false,
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

export const userLogoutAsync = createAsyncThunk("auth/userLogout", async () => {
  const response = await userLogout();
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCookie: (state, action) => {
      state.cookie = action.payload;
      state.isLoggedIn = true;
      state.authFailed = false;
    },
    removeCookie: (state) => {
      state.cookie = null;
      state.isLoggedIn = false;
      state.authFailed = true;
    },
    setAuthFailed: (state) => {
      state.cookie = null;
      state.authFailed = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsync.pending, (state, action) => {
        state.loginLoading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        if (action.payload.success) {
          state.isLoggedIn = true;
          state.cookie = action.payload.token;
          state.authFailed = false;
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
          state.isLoggedIn = false;
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
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedIn = false;
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
      .addCase(userSignupAsync.pending, (state, action) => {
        state.signupLoading = true;
      })
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.authFailed = false;
        if (action.payload.success) {
          state.email = action.payload.email;
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
      .addCase(userSignupAsync.rejected, (state, action) => {
        state.signupLoading = false;
        state.isLoggedIn = false;
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
      .addCase(verifyUserEmailAsync.fulfilled, (state, action) => {
        state.verifyMessage = action.payload.message;
        state.authFailed = false;
        if (action.payload.success) {
          state.cookie = action.payload.token;
          state.isVerified = true;
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
      .addCase(verifyUserEmailAsync.rejected, (state, action) => {
        state.isVerified = false;
        state.verifyMessage = "Verification Failed.";
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
      .addCase(userLogoutAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoggedIn = false;
          state.cookie = null;
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
      });
  },
});

export const { setCookie, setAuthFailed, removeCookie } = authSlice.actions;

export const selectLoginLoading = (state: any) => state.auth.loginLoading;
export const selectSignupLoading = (state: any) => state.auth.signupLoading;
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectUserEmail = (state: any) => state.auth.email;
export const selectIsVerified = (state: any) => state.auth.isVerified;
export const selectVerifyMessage = (state: any) => state.auth.verifyMessage;
export const selectCookie = (state: any) => state.auth.cookie;
export const selectAuthFailed = (state: any) => state.auth.authFailed;

export default authSlice.reducer;
