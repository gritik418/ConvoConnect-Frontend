import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getUser = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
