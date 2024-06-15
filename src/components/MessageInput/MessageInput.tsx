import React, { ChangeEvent, useState } from "react";
import styles from "./MessageInput.module.css";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import { getSocket } from "@/contexts/SocketProvider";
import { SEND_MESSAGE } from "@/constants/events";
import { ChatType } from "../ChatSection/ChatSection";
import { useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { UserDataType, selectUser } from "@/features/user/userSlice";

const MessageInput = () => {
  const [message, setMessage] = useState<string>("");
  const chat: ChatType = useSelector(selectSelectedChat);
  const user: UserDataType = useSelector(selectUser);
  const socket = getSocket();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message) return;

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
