import React from "react";
import styles from "./ChatInfo.module.css";
import Image from "next/image";

const ChatInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          src={"/images/avatar.jpeg"}
          alt="profile"
          height={60}
          width={60}
        />
      </div>
    </div>
  );
};

export default ChatInfo;
