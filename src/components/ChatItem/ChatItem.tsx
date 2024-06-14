"use client";
import React from "react";
import styles from "./ChatItem.module.css";
import Image from "next/image";
import { ChatType, MemberType } from "../ChatSection/ChatSection";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

const ChatItem = ({ chat }: { chat: ChatType }) => {
  const user = useSelector(selectUser);
  if (!chat) return;
  const sender: MemberType | undefined = chat.members.find(
    (member: MemberType) => {
      return member._id !== user._id;
    }
  );
  console.log(sender);
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          src={"/images/avatar.jpeg"}
          alt="profile"
          height={50}
          width={50}
        />
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{sender.name}</p>
        <p className={styles.lastMessage}>Hey everyone</p>
      </div>
    </div>
  );
};

export default ChatItem;
