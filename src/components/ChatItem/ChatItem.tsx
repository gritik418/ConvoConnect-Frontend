"use client";
import React, { useEffect } from "react";
import styles from "./ChatItem.module.css";
import Image from "next/image";
import { ChatType, MemberType } from "../ChatSection/ChatSection";
import { useDispatch, useSelector } from "react-redux";
import { UserDataType, selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import {
  changeSelectedChat,
  selectSelectedChat,
} from "@/features/chat/chatSlice";
import { useSocket } from "@/contexts/SocketProvider";
import { USER_OFFLINE, USER_ONLINE } from "@/constants/events";
import {
  addOnlineFriends,
  removeOnlineFriend,
  selectOnlineFriends,
} from "@/features/friend/friendSlice";
import { getMessagesAsync } from "@/features/message/messageSlice";

const ChatItem = ({ chat }: { chat: ChatType }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const user: UserDataType = useSelector(selectUser);
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const onlineFriends: string[] = useSelector(selectOnlineFriends);
  const socket = useSocket();

  let sender: MemberType | undefined;

  if (!chat.isGroupChat) {
    sender = chat.members.find((member: MemberType) => {
      return member._id !== user._id;
    });
    if (sender?.isActive) {
      dispatch(addOnlineFriends(sender._id));
    }
  }

  const handleChangeChat = () => {
    dispatch(changeSelectedChat({ chat }));
    dispatch(getMessagesAsync(chat._id));
  };

  useEffect(() => {
    socket?.on(USER_ONLINE, ({ id }) => {
      dispatch(addOnlineFriends(id));
    });

    socket?.on(USER_OFFLINE, ({ id }) => {
      dispatch(removeOnlineFriend(id));
    });
  }, []);

  return (
    <div
      className={`${styles.container} ${
        selectedChat._id === chat._id ? styles.selected : ""
      }`}
      onClick={handleChangeChat}
    >
      <div className={styles.avatar}>
        <Image
          src={"/images/avatar.jpeg"}
          alt="profile"
          height={50}
          width={50}
          className={styles.image}
        />
        {onlineFriends.includes(sender?._id as string) && (
          <span className={styles.activeUser}></span>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{sender?.name}</p>
        <p className={styles.lastMessage}>Hey everyone</p>
      </div>
    </div>
  );
};

export default ChatItem;
