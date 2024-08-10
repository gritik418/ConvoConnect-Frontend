import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type UserStatusDataType = {
  content?: string;
  images?: any;
};

export const getUserStatus = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/status/`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const uploadStatus = async (statusData: UserStatusDataType) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("content", statusData.content || "");
    if (statusData.images) {
      statusData.images.forEach((img: any) => {
        bodyFormData.append("images", img);
      });
    }

    const { data } = await axios.post(
      `${BASE_URL}/status/upload`,
      bodyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const removeUserStatus = async () => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/status/remove`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getFriendStatus = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/status/friends`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
