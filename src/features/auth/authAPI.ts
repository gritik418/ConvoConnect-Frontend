import { LoginDataType } from "@/validators/loginValidator";
import { SignUpDataType } from "@/validators/signupValidator";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userLogin = async (loginData: LoginDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
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
      }
    );
    console.log(data);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
