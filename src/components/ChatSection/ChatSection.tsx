import React from "react";
import styles from "./ChatSection.module.css";
import ChatItem from "../ChatItem/ChatItem";
import { useSelector } from "react-redux";
import { selectChats } from "@/features/chat/chatSlice";

export type MemberType = {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
};

export type ChatType = {
  admins: [];
  createdAt: string;
  isGroupChat: false;
  members: MemberType[];
  updatedAt: string;
  __v: number;
  _id: string;
};

export type StyleType = {
  width: string;
};

const ChatSection = () => {
  const chats: ChatType[] = useSelector(selectChats);

  return (
    <div className={styles.container}>
      <input className={styles.search} type="text" placeholder="Search..." />
      <div className={styles.chats}>
        {chats.map((chat: ChatType) => {
          return <ChatItem key={chat._id} chat={chat} />;
        })}
      </div>
    </div>
  );
};

export default ChatSection;
