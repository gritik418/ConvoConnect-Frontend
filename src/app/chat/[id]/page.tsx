"use client";
import ChatLayout from "@/components/ChatLayout/ChatLayout";
import MessageSection from "@/components/MessageSection/MessageSection";
import { ACTIVE_FRIENDS, OFFLINE_FRIEND } from "@/constants/events";
import { useSocket } from "@/contexts/socket/SocketProvider";
import {
  getChatByIdAsync,
  getChatsAsync,
  selectChats,
} from "@/features/chat/chatSlice";
import {
  onlineFriend,
  offlineFriend,
  getActiveFriendsAsync,
} from "@/features/friend/friendSlice";
import { getMessagesAsync } from "@/features/message/messageSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "dgram";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Chat = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const socket: Socket = useSocket();
  const chats: ChatType[] = useSelector(selectChats);

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
    if (chats?.length === 0) {
      dispatch(getChatsAsync());
    }
    dispatch(getChatByIdAsync(params.id));
    dispatch(getMessagesAsync(params.id));
    dispatch(getActiveFriendsAsync());
  }, [params.id]);

  return (
    <ChatLayout>
      <MessageSection chatId={params.id} />
    </ChatLayout>
  );
};

export default Chat;
