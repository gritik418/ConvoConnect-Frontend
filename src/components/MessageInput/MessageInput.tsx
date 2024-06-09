import React from "react";
import styles from "./MessageInput.module.css";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";

const MessageInput = () => {
  return (
    <div className={styles.container}>
      <GrAttachment className="text-3xl cursor-pointer" />
      <input type="text" className={styles.input} placeholder="Type here..." />
      <div className={styles.btn}>
        <IoIosSend />
      </div>
    </div>
  );
};

export default MessageInput;
