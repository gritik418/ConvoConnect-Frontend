import React from "react";
import styles from "./MessageSection.module.css";
import { StyleType } from "../ChatSection/ChatSection";
import ChatInfo from "../ChatInfo/ChatInfo";

const MessageSection = ({ style }: { style: StyleType }) => {
  return (
    <div className={styles.container} style={{ width: style.width }}>
      <ChatInfo />
    </div>
  );
};

export default MessageSection;
