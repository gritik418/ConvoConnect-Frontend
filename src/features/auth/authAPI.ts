import { LoginDataType } from "@/validators/loginValidator";
import { SignUpDataType } from "@/validators/signupValidator";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ResetPasswordDataType = {
  new_password: string;
  userId: string;
  secretToken: string;
  confirm_new_password: string;
};

export const userLogin = async (loginData: LoginDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const userSignup = async (signupData: SignUpDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/signup`, signupData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const verifyUserEmail = async (id: string, secretToken: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/user/verify/${id}/${secretToken}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/user/forgot`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const resetPassword = async (payload: ResetPasswordDataType) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/user/reset/${payload.userId}/${payload.secretToken}`,
      {
        new_password: payload.new_password,
        confirm_new_password: payload.confirm_new_password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const userLogout = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
