import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type UpdateUserDataType = {
  first_name: string;
  last_name?: string;
  bio?: string;
  avatar?: any;
  background?: any;
};

export const getUser = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user`, {
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

export const updateUser = async (userData: UpdateUserDataType) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("first_name", userData.first_name);
    bodyFormData.append("last_name", userData.last_name || "");
    bodyFormData.append("bio", userData.bio || "");
    bodyFormData.append("avatar", userData.avatar);
    bodyFormData.append("background", userData.background);

    const { data } = await axios.patch(`${BASE_URL}/user`, bodyFormData, {
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
