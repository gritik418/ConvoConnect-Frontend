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
import { selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const socket: Socket = useSocket();
  const { showNotification } = useContext(NotificationContext);
  const user: UserType = useSelector(selectUser);

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
        <p className="text-lg">
          {" "}
          {user?._id ? "Please Select a Chat" : "Please Login"}
        </p>
      </div>
    </Layout>
  );
};

export default Home;
