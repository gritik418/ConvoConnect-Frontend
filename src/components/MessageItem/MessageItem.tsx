import React from "react";
import styles from "./MessageItem.module.css";
import Image from "next/image";
import { MessageType } from "@/features/message/messageSlice";
import { UserDataType, selectUser } from "@/features/user/userSlice";
import { useSelector } from "react-redux";

const MessageItem = ({ message }: { message: MessageType }) => {
  const user: UserDataType = useSelector(selectUser);

  const date = new Date(message.updatedAt);

  const time = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div
      className={styles.container}
      style={{
        alignSelf: message.sender._id === user._id ? "flex-end" : "flex-start",
      }}
    >
      {message.sender._id !== user._id && (
        <div className={styles.avatar}>
          <Image
            src={message.sender.avatar || "/images/avatar.jpeg"}
            alt="profile"
            height={20}
            width={20}
          />
        </div>
      )}
      <div
        className={styles.content}
        style={{
          backgroundColor:
            message.sender._id === user._id ? "white" : "#ffdddd",
          color: message.sender._id === user._id ? "#000" : "#000",
        }}
      >
        <p>{message.content}</p>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
};

export default MessageItem;
