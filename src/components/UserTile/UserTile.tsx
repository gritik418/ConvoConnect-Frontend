import React from "react";
import styles from "./UserTile.module.css";
import { Avatar } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { SearchedUserType } from "../AddFriend/AddFriend";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { sendFriendRequestAsync } from "@/features/friend/friendSlice";

const UserTile = ({ user }: { user: SearchedUserType }) => {
  const dispatch = useDispatch<Dispatch<any>>();

  const sendFriendRequest = () => {
    dispatch(sendFriendRequestAsync(user._id));
  };
  return (
    <div className={styles.container}>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <div className={styles.info}>
        <div className={styles.group}>
          <p className={styles.name}>{user.name}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
        <IoAddOutline className={styles.btn} onClick={sendFriendRequest} />
      </div>
    </div>
  );
};

export default UserTile;
