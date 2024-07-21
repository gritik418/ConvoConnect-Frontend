import { SEND_MESSAGE } from "@/constants/events";
import { useSocket } from "@/contexts/SocketProvider";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { addMessage } from "@/features/message/messageSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { ChangeEvent, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

type PropsType = {
  user: {
    _id: string;
    first_name: string;
    last_name?: string;
    avatar?: string;
    username: string;
  };
};

const MessageInput = ({ user }: PropsType) => {
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>();
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const socket = useSocket();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message) return;
    socket.emit(SEND_MESSAGE, {
      message,
      selectedChat: {
        _id: selectedChat._id,
        members: selectedChat.members,
      },
    });

    const realTimeMessage = {
      _id: uuidv4().toString(),
      chat_id: selectedChat._id,
      content: message,
      sender: user,
    };
    dispatch(addMessage({ chat: selectedChat, message: realTimeMessage }));
    setMessage("");
  };
  return (
    <div className="h-[70px] flex items-center px-4 py-3 gap-4 border-t-2">
      <input
        type="text"
        placeholder="Type here..."
        value={message}
        onChange={handleChange}
        className="border-2 w-full py-3 px-3 rounded-md outline-none text-xl text-gray-500"
      />
      <div className="w-[70px] cursor-pointer bg-gray-300 h-[55px] grid place-items-center rounded-md">
        <IoSend className="text-black text-3xl" onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default MessageInput;
