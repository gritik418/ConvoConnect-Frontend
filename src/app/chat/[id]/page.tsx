"use client";
import Layout from "@/components/Layout/Layout";
import MessageSection from "@/components/MessageSection/MessageSection";
import { ACTIVE_FRIENDS, OFFLINE_FRIEND } from "@/constants/events";
import { useSocket } from "@/contexts/SocketProvider";
import { getChatByIdAsync, getChatsAsync } from "@/features/chat/chatSlice";
import {
  onlineFriend,
  offlineFriend,
  getActiveFriendsAsync,
} from "@/features/friend/friendSlice";
import { getMessagesAsync } from "@/features/message/messageSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "dgram";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const Chat = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const socket: Socket = useSocket();

  const userOnlineHandler = useCallback(({ id }: { id: string }) => {
    dispatch(onlineFriend(id));
  }, []);

  const userOfflineHandler = useCallback(({ id }: { id: string }) => {
    dispatch(offlineFriend(id));
  }, []);

  useEffect(() => {
    socket.on(ACTIVE_FRIENDS, userOnlineHandler);

    socket.on(OFFLINE_FRIEND, userOfflineHandler);

    return () => {
      socket.off(ACTIVE_FRIENDS, userOnlineHandler);
      socket.off(OFFLINE_FRIEND, userOfflineHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(getChatsAsync());
    dispatch(getChatByIdAsync(params.id));
    dispatch(getMessagesAsync(params.id));
    dispatch(getActiveFriendsAsync());
  }, [params.id]);

  return (
    <Layout>
      <MessageSection chatId={params.id} />
    </Layout>
  );
};

export default Chat;
