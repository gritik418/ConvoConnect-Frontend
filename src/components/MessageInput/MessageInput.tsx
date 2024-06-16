import React, { ChangeEvent, useState } from "react";
import styles from "./MessageInput.module.css";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import { useSocket } from "@/contexts/SocketProvider";
import { SEND_MESSAGE } from "@/constants/events";
import { ChatType } from "../ChatSection/ChatSection";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { UserDataType, selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { addMessage } from "@/features/message/messageSlice";
import { v4 as uuidv4 } from "uuid";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");
  const chat: ChatType = useSelector(selectSelectedChat);
  const user: UserDataType = useSelector(selectUser);
  const dispatch = useDispatch<Dispatch<any>>();
  const socket = useSocket();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message) return;

    const sentMessage = {
      chatId: chat._id,
      content: message,
      createdAt: Date.now(),
      sender: { _id: user._id, name: user.name, avatar: user.avatar },
      updatedAt: Date.now(),
      _id: uuidv4(),
    };
    dispatch(addMessage(sentMessage));
    socket?.emit(SEND_MESSAGE, { message, chat, user: user });
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <GrAttachment className="text-3xl cursor-pointer" />
      <input
        type="text"
        value={message}
        onChange={handleChange}
        className={styles.input}
        placeholder="Type here..."
      />
      <div className={styles.btn}>
        <IoIosSend onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default MessageInput;
