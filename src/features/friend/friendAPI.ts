import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getActiveFriends = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/friend/getActiveFriends`, {
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

export const searchUsers = async (searchQuery: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/friend/searchUser?search=${searchQuery}`,
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

export const getFriendRequests = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/friend/getFriendRequests`, {
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

export const sendFriendRequest = async (id: string) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/friend/sendFriendRequest/${id}`,
      {},
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

export const acceptFriendRequest = async (id: string) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/friend/acceptFriendRequest/${id}`,
      {},
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

export const declineFriendRequest = async (id: string) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/friend/declineFriendRequest/${id}`,
      {},
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
