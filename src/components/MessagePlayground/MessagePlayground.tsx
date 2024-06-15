"use client";
import React, { useEffect, useRef } from "react";
import styles from "./MessagePlayground.module.css";
import MessageItem from "../MessageItem/MessageItem";
import { useSocket } from "@/contexts/SocketProvider";
import { MESSAGE_RECEIVED } from "@/constants/events";
import { ChatType } from "../ChatSection/ChatSection";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import {
  MessageType,
  addMessage,
  selectMessages,
} from "@/features/message/messageSlice";
import { Dispatch } from "@reduxjs/toolkit";

const MessagePlayground = () => {
  const socket = useSocket();
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const messages: MessageType[] = useSelector(selectMessages);
  const dispatch = useDispatch<Dispatch<any>>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket?.on(MESSAGE_RECEIVED, ({ chatId, message, sender }) => {
      if (selectedChat._id !== chatId) return;
      return dispatch(addMessage(message));
    });

    return () => {
      socket?.off(MESSAGE_RECEIVED);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className={styles.container}>
      {messages.map((message: MessageType) => {
        return <MessageItem key={message._id} message={message} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagePlayground;
