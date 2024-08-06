import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type CreateGroupDataType = {
  group_name: string;
  group_description?: string;
  group_icon?: any;
  members: string[];
};

export type UpdateGroupInfoDataType = {
  group_name: string;
  group_description: string;
  group_icon?: any;
  chatId: string;
};

export const getChats = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/chat`, {
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

export const getChatById = async (id: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/chat/${id}`, {
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

export const createGroup = async (userData: CreateGroupDataType) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("group_name", userData.group_name);
    bodyFormData.append("group_description", userData.group_description || "");
    bodyFormData.append("group_icon", userData.group_icon);
    userData.members.forEach((item) => bodyFormData.append("members[]", item));

    const { data } = await axios.post(`${BASE_URL}/chat/create`, bodyFormData, {
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

export const updateGroupInfo = async (groupInfo: UpdateGroupInfoDataType) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("group_name", groupInfo.group_name);
    bodyFormData.append("group_description", groupInfo.group_description || "");
    bodyFormData.append("group_icon", groupInfo.group_icon || "");

    const { data } = await axios.patch(
      `${BASE_URL}/chat/update/${groupInfo.chatId}`,
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
