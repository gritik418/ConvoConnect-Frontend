"use client";
import Layout from "@/components/Layout/Layout";
import Navbar from "@/components/Navbar/Navbar";
import { OFFLINE, ONLINE, USER_OFFLINE, USER_ONLINE } from "@/constants/events";
import { getSocket } from "@/contexts/SocketProvider";
import { getChatsAsync } from "@/features/chat/chatSlice";
import {
  UserDataType,
  getUserAsync,
  selectUser,
} from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const socket = getSocket();
  const user: UserDataType = useSelector(selectUser);

  window.addEventListener(
    "pagehide",
    function () {
      if (!user) return;
      if (!socket?.connected) return;
      socket?.emit(OFFLINE, { friends: user.friends, id: user._id });
    },
    { capture: true }
  );

  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getChatsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    if (!socket?.connected) return;
    if (user) {
      socket.emit(ONLINE, { friends: user.friends, id: user._id });
    }
  }, [user, socket]);

  return (
    <>
      <Navbar />
      <Layout />
    </>
  );
};

export default Home;
