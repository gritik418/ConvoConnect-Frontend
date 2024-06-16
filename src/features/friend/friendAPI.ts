import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const searchUsers = async (searchQuery: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/friend/search?search=${searchQuery}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const sendFriendRequest = async (receiverId: string) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/friend/request`,
      { receiverId },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const acceptFriendRequest = async (senderId: string) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/friend/accept/${senderId}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const declineFriendRequest = async (senderId: string) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/friend/decline/${senderId}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
