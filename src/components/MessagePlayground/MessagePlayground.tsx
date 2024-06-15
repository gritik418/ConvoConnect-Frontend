"use client";
import React, { useEffect } from "react";
import styles from "./MessagePlayground.module.css";
import MessageItem from "../MessageItem/MessageItem";
import { getSocket } from "@/contexts/SocketProvider";
import { MESSAGE_RECEIVED } from "@/constants/events";
import { ChatType } from "../ChatSection/ChatSection";
import { useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";

const messages: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
];

const MessagePlayground = () => {
  const socket = getSocket();
  const selectedChat: ChatType = useSelector(selectSelectedChat);

  useEffect(() => {
    socket?.on(MESSAGE_RECEIVED, ({ chatId, message, sender }) => {
      if (selectedChat._id === chatId) {
      }
    });
  }, []);
  return (
    <div className={styles.container}>
      {messages.map((i: number) => {
        if (i % 2 == 0) {
          return <MessageItem key={i} isSameUser={true} />;
        }
        return <MessageItem key={i} isSameUser={false} />;
      })}
    </div>
  );
};

export default MessagePlayground;
