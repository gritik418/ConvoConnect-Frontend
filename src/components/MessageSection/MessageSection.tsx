import React from "react";
import styles from "./MessageSection.module.css";
import { StyleType } from "../ChatSection/ChatSection";
import ChatInfo from "../ChatInfo/ChatInfo";
import MessagePlayground from "../MessagePlayground/MessagePlayground";
import MessageInput from "../MessageInput/MessageInput";

const MessageSection = () => {
  return (
    <div className={styles.container}>
      <ChatInfo />
      <MessagePlayground />
      <MessageInput />
    </div>
  );
};

export default MessageSection;
