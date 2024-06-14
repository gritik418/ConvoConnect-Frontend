"use client";
import { ChatType, MemberType } from "@/components/ChatSection/ChatSection";
import Layout from "@/components/Layout/Layout";
import Navbar from "@/components/Navbar/Navbar";
import { ONLINE } from "@/constants/events";
import { getSocket } from "@/contexts/SocketProvider";
import { getChatsAsync, selectChats } from "@/features/chat/chatSlice";
import { getUserAsync, selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const socket = getSocket();
  const chats: ChatType[] = useSelector(selectChats);
  const user: MemberType = useSelector(selectUser);
  const chatIds: string[] = chats.map((chat: ChatType) => {
    return chat._id;
  });

  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getChatsAsync());
  }, []);

  // useEffect(() => {
  //   if (chatIds.length > 0) {
  //     if (socket?.connected) {
  //       socket.emit(ONLINE, { chats: chatIds, id: user._id });
  //     }
  //   }
  // }, [chatIds]);

  return (
    <>
      <Navbar />
      <Layout />
    </>
  );
};

export default Home;
