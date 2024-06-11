import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type LoginDataType = {
  email: string;
  password: string;
};

export const userLogin = async (userData: LoginDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
