"use client";
import Layout from "@/components/Layout/Layout";
import {
  ACTIVE_FRIENDS,
  NEW_MESSAGE,
  OFFLINE_FRIEND,
} from "@/constants/events";
import NotificationContext from "@/contexts/notifications/NotificationContext";
import { useSocket } from "@/contexts/socket/SocketProvider";
import { getChatsAsync, updateLastMessage } from "@/features/chat/chatSlice";
import {
  getActiveFriendsAsync,
  offlineFriend,
  onlineFriend,
} from "@/features/friend/friendSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const socket: Socket = useSocket();
  const { showNotification } = useContext(NotificationContext);

  const newMessageHandler = useCallback(
    ({ message }: { message: MessageType }) => {
      showNotification(message.content, message.sender);
      dispatch(updateLastMessage({ ...message, sender: message.sender._id }));
    },
    []
  );

  const userOnlineHandler = useCallback(({ id }: { id: string }) => {
    dispatch(onlineFriend(id));
  }, []);

  const userOfflineHandler = useCallback(({ id }: { id: string }) => {
    dispatch(offlineFriend(id));
  }, []);

  useEffect(() => {
    socket.on(ACTIVE_FRIENDS, userOnlineHandler);

    socket.on(OFFLINE_FRIEND, userOfflineHandler);

    socket.on(NEW_MESSAGE, newMessageHandler);
    return () => {
      socket.off(ACTIVE_FRIENDS, userOnlineHandler);
      socket.off(OFFLINE_FRIEND, userOfflineHandler);
      socket.off(NEW_MESSAGE, newMessageHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(getChatsAsync());
    dispatch(getActiveFriendsAsync());
  }, []);
  return (
    <Layout>
      <div className="hidden sm:flex w-full border-2 h-full bg-gray-50 flex-col items-center justify-center">
        <p>Please Select a Chat</p>
      </div>
    </Layout>
  );
};

export default Home;
