"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import UserTile from "../UserTile/UserTile";
import MessagePlayground from "../MessagePlayground/MessagePlayground";
import MessageInput from "../MessageInput/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedChat,
  updateLastMessage,
} from "@/features/chat/chatSlice";
import { useSocket } from "@/contexts/socket/SocketProvider";
import { NEW_MESSAGE } from "@/constants/events";
import { Dispatch } from "@reduxjs/toolkit";
import { addMessage, selectMessages } from "@/features/message/messageSlice";
import { selectUser } from "@/features/user/userSlice";
import NotificationContext from "@/contexts/notifications/NotificationContext";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const MessageSection = ({ chatId }: { chatId: string }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const initialMessages = useSelector(selectMessages);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const socket = useSocket();
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const user: UserType = useSelector(selectUser);
  const { showNotification } = useContext(NotificationContext);

  const newMessageHandler = useCallback(
    ({ message }: { message: MessageType }) => {
      if (chatId === message.chat_id) {
        dispatch(addMessage({ message }));
      } else {
        showNotification(message.content, message.sender);
      }
      dispatch(updateLastMessage({ ...message, sender: message.sender._id }));
    },
    []
  );

  useEffect(() => {
    socket.on(NEW_MESSAGE, newMessageHandler);

    return () => {
      socket.off(NEW_MESSAGE, newMessageHandler);
    };
  }, []);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  if (!selectedChat._id)
    return (
      <div className="border-2 w-full h-full bg-gray-50 flex flex-col items-center justify-center">
        <p>Please Select a Chat</p>
      </div>
    );

  return (
    <div className="border-2 w-full h-full bg-gray-50 flex flex-col">
      <div className="h-[68px] bg-gray-200 border-b-2">
        <UserTile id={user?._id} />
      </div>

      <MessagePlayground
        messages={messages}
        className="h-[calc(100%-68px-70px)] p-3 bg-[#09569936] overflow-y-scroll"
      />

      <MessageInput />
    </div>
  );
};

export default MessageSection;
