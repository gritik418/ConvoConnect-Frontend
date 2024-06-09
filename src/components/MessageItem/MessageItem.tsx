import React from "react";
import styles from "./MessageItem.module.css";
import Image from "next/image";

const MessageItem = ({ isSameUser }: { isSameUser: boolean }) => {
  return (
    <div
      className={styles.container}
      style={{
        alignSelf: isSameUser ? "flex-end" : "flex-start",
      }}
    >
      {!isSameUser && (
        <div className={styles.avatar}>
          <Image
            src={"/images/avatar.jpeg"}
            alt="profile"
            height={20}
            width={20}
          />
        </div>
      )}
      <div
        className={styles.content}
        style={{
          backgroundColor: isSameUser ? "white" : "#ffdddd",
          color: isSameUser ? "#000" : "#000",
        }}
      >
        <p>Hello debk</p>
        <span className={styles.time}>2:30 am</span>
      </div>
    </div>
  );
};

export default MessageItem;
