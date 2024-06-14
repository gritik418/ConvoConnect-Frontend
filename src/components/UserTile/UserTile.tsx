import React from "react";
import styles from "./UserTile.module.css";
import { Avatar } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";

const UserTile = () => {
  return (
    <div className={styles.container}>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <div className={styles.info}>
        <div className={styles.group}>
          <p className={styles.name}>Ritik Gupta</p>
          <p className={styles.email}>gritik418@gmail.com</p>
          <p className={styles.username}>@ritikgupta</p>
        </div>
        <IoAddOutline className={styles.btn} />
      </div>
    </div>
  );
};

export default UserTile;
