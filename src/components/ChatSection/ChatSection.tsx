import React from "react";
import styles from "./ChatSection.module.css";
import ChatItem from "../ChatItem/ChatItem";

export type StyleType = {
  width: string;
};

const ChatSection = ({ style }: { style: StyleType }) => {
  let chats = [1, 2, 4, 5, 6, 7, 9];
  return (
    <div className={styles.container} style={{ width: style.width }}>
      <input className={styles.search} type="text" placeholder="Search..." />
      {chats.map((i) => {
        return <ChatItem />;
      })}
    </div>
  );
};

export default ChatSection;
