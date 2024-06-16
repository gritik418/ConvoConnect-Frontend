"use client";
import React, { useCallback, useEffect, useRef } from "react";
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

  const messageReceiveHandler = useCallback(
    ({ chatId, message, sender }: any) => {
      if (selectedChat._id !== chatId) return;
      return dispatch(addMessage(message));
    },
    []
  );

  useEffect(() => {
    socket?.on(MESSAGE_RECEIVED, messageReceiveHandler);

    return () => {
      socket?.off(MESSAGE_RECEIVED, messageReceiveHandler);
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
