import React from "react";
import styles from "./ChatItem.module.css";
import Image from "next/image";

const ChatItem = () => {
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
        <p className={styles.name}>Ritik Gupta</p>
        <p className={styles.lastMessage}>Hey everyone</p>
      </div>
    </div>
  );
};

export default ChatItem;
