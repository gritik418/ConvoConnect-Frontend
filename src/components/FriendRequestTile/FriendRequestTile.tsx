import React from "react";
import styles from "./FriendRequestTile.module.css";
import { Avatar } from "@chakra-ui/react";
import { RequestType } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  acceptFriendRequestAsync,
  declineFriendRequestAsync,
} from "@/features/friend/friendSlice";

const FriendRequestTile = ({ request }: { request: RequestType }) => {
  const dispatch = useDispatch<Dispatch<any>>();

  const acceptRequest = () => {
    dispatch(acceptFriendRequestAsync(request._id));
  };

  const declineRequest = () => {
    dispatch(declineFriendRequestAsync(request._id));
  };
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <div className={styles.group}>
          <p>{request?.name}</p>
          <p className={styles.email}>{request?.email}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.decline} onClick={declineRequest}>
          Decline
        </div>
        <div className={styles.accept} onClick={acceptRequest}>
          Accept
        </div>
      </div>
    </div>
  );
};

export default FriendRequestTile;
