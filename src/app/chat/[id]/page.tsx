"use client";
import ChatLayout from "@/components/ChatLayout/ChatLayout";
import MessageSection from "@/components/MessageSection/MessageSection";
import {
  getChatByIdAsync,
  getChatsAsync,
  selectChats,
} from "@/features/chat/chatSlice";
import { getActiveFriendsAsync } from "@/features/friend/friendSlice";
import { getMessagesAsync } from "@/features/message/messageSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Chat = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const chats: ChatType[] = useSelector(selectChats);

  useEffect(() => {
    if (chats?.length === 0) {
      dispatch(getChatsAsync());
    }
    dispatch(getChatByIdAsync(params.id));
    dispatch(getMessagesAsync(params.id));
    dispatch(getActiveFriendsAsync());
  }, [params.id, dispatch]);

  return (
    <ChatLayout>
      <MessageSection />
    </ChatLayout>
  );
};

export default Chat;
