import React from "react";
import styles from "./Layout.module.css";
import ChatSection from "../ChatSection/ChatSection";
import MessageSection from "../MessageSection/MessageSection";

const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chats}>
        <ChatSection />
      </div>
      <div className={styles.messages}>
        <MessageSection />
      </div>
    </div>
  );
};

export default Layout;
