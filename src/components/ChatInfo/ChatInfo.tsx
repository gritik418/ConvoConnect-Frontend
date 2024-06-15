import React from "react";
import styles from "./ChatInfo.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { ChatType, MemberType } from "../ChatSection/ChatSection";
import { UserDataType, selectUser } from "@/features/user/userSlice";

const ChatInfo = () => {
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const user: UserDataType = useSelector(selectUser);

  if (!selectedChat.members) return <>Select a Chat</>;

  let sender: MemberType | undefined;

  if (!selectedChat.isGroupChat) {
    sender = selectedChat?.members.find((member: MemberType) => {
      return member._id !== user._id;
    });
  }
  return !selectedChat.isGroupChat ? (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          src={sender?.avatar || "/images/avatar.jpeg"}
          alt="profile"
          height={60}
          width={60}
        />
      </div>
      <div>
        <p className={styles.name}>{sender?.name}</p>
        <p className={styles.email}>{sender?.email}</p>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          src={selectedChat.groupIcon || "/images/avatar.jpeg"}
          alt="profile"
          height={60}
          width={60}
        />
      </div>
      <div>
        <p className={styles.name}>{selectedChat.groupName}</p>
      </div>
    </div>
  );
};

export default ChatInfo;
