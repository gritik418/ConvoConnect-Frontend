"use client";
import Layout from "@/components/Layout/Layout";
import Navbar from "@/components/Navbar/Navbar";
import { OFFLINE, ONLINE, USER_OFFLINE, USER_ONLINE } from "@/constants/events";
import { useSocket } from "@/contexts/SocketProvider";
import { getChatsAsync } from "@/features/chat/chatSlice";
import {
  addOnlineFriends,
  removeOnlineFriend,
} from "@/features/friend/friendSlice";
import {
  UserDataType,
  getUserAsync,
  selectUser,
} from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const socket = useSocket();
  const user: UserDataType = useSelector(selectUser);

  const userOnlineHandler = useCallback(({ id }: { id: string }) => {
    dispatch(addOnlineFriends(id));
  }, []);

  const userOfflineHandler = useCallback(({ id }: { id: string }) => {
    dispatch(removeOnlineFriend(id));
  }, []);

  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getChatsAsync());

    socket?.on(USER_ONLINE, userOnlineHandler);

    socket?.on(USER_OFFLINE, userOfflineHandler);

    return () => {
      socket?.off(USER_ONLINE, userOnlineHandler);
      socket?.off(USER_OFFLINE, userOfflineHandler);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    if (!socket?.connected) return;
    if (user) {
      socket.emit(ONLINE, { friends: user.friends, id: user._id });
    }
    window.addEventListener(
      "pagehide",
      function () {
        if (!user) return;
        if (!socket?.connected) return;
        socket?.emit(OFFLINE, { friends: user.friends, id: user._id });
      },
      { capture: true }
    );
  }, [user, socket]);

  return (
    <>
      <Navbar />
      <Layout />
    </>
  );
};

export default Home;
