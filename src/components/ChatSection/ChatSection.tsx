import React from "react";
import styles from "./ChatSection.module.css";
import ChatItem from "../ChatItem/ChatItem";

export type StyleType = {
  width: string;
};

const ChatSection = () => {
  let chats: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  return (
    <div className={styles.container}>
      <input className={styles.search} type="text" placeholder="Search..." />
      <div className={styles.chats}>
        {chats.map((i) => {
          return <ChatItem key={i} />;
        })}
      </div>
    </div>
  );
};

export default ChatSection;
