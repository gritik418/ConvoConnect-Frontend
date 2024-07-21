import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMessages = async (id: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/message/${id}`, {
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
