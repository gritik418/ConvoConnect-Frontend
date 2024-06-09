import React from "react";
import styles from "./MessagePlayground.module.css";
import MessageItem from "../MessageItem/MessageItem";

const messages: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
];

const MessagePlayground = () => {
  return (
    <div className={styles.container}>
      {messages.map((i: number) => {
        if (i % 2 == 0) {
          return <MessageItem key={i} isSameUser={true} />;
        }
        return <MessageItem key={i} isSameUser={false} />;
      })}
    </div>
  );
};

export default MessagePlayground;
