import React from "react";
import styles from "./MessageSection.module.css";
import ChatInfo from "../ChatInfo/ChatInfo";
import MessagePlayground from "../MessagePlayground/MessagePlayground";
import MessageInput from "../MessageInput/MessageInput";
import { ChatType } from "../ChatSection/ChatSection";
import { useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";

const MessageSection = () => {
  const selectedChat: ChatType = useSelector(selectSelectedChat);

  return selectedChat._id ? (
    <div className={styles.container}>
      <ChatInfo />
      <MessagePlayground />
      <MessageInput />
    </div>
  ) : (
    <>Please Select a chat</>
  );
};

export default MessageSection;
