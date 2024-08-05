"use client";
import {
  ACTIVE_FRIENDS,
  NEW_GROUP,
  NEW_MESSAGE,
  OFFLINE_FRIEND,
} from "@/constants/events";
import NotificationContext from "@/contexts/notifications/NotificationContext";
import { useSocket } from "@/contexts/socket/SocketProvider";
import {
  addNewChat,
  getChatsAsync,
  updateLastMessage,
} from "@/features/chat/chatSlice";
import { offlineFriend, onlineFriend } from "@/features/friend/friendSlice";
import { addMessage } from "@/features/message/messageSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

const SocketHandler = ({ children }: { children: React.ReactNode }) => {
  const socket: Socket = useSocket();
  const dispatch = useDispatch<Dispatch<any>>();
  const { showNotification } = useContext(NotificationContext);

  const newMessageHandler = useCallback(
    ({ message }: { message: MessageType }) => {
      if (window.location.pathname.includes(message.chat_id)) {
        dispatch(addMessage({ message }));
      } else {
        showNotification(message.content, message.sender);
      }
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

  const newGroupHandler = useCallback(({ group }: { group: ChatType }) => {
    dispatch(addNewChat(group));
  }, []);

  useEffect(() => {
    dispatch(getChatsAsync());
    socket.on(ACTIVE_FRIENDS, userOnlineHandler);

    socket.on(OFFLINE_FRIEND, userOfflineHandler);

    socket.on(NEW_MESSAGE, newMessageHandler);

    socket.on(NEW_GROUP, newGroupHandler);
    return () => {
      socket.off(ACTIVE_FRIENDS, userOnlineHandler);
      socket.off(OFFLINE_FRIEND, userOfflineHandler);
      socket.off(NEW_MESSAGE, newMessageHandler);
      socket.off(NEW_GROUP, newGroupHandler);
    };
  }, []);
  return <>{children}</>;
};

export default SocketHandler;
