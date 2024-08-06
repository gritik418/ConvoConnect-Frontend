"use client";
import React, { useEffect, useState } from "react";
import UserTile from "../UserTile/UserTile";
import MessagePlayground from "../MessagePlayground/MessagePlayground";
import MessageInput from "../MessageInput/MessageInput";
import { useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { selectMessages } from "@/features/message/messageSlice";
import { selectUser } from "@/features/user/userSlice";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const MessageSection = () => {
  const initialMessages = useSelector(selectMessages);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const user: UserType = useSelector(selectUser);
  const { theme } = useCustomTheme();

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  if (!selectedChat._id)
    return (
      <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center">
        <p>Please Select a Chat</p>
      </div>
    );

  return (
    <div
      className={`w-full h-[calc(100vh-58px)] flex flex-col ${
        theme === "dark" ? "bg-[#000]" : "bg-gray-50"
      }`}
    >
      <div
        className={`h-[70px] ${theme === "dark" ? "bg-black" : "bg-gray-200"}`}
      >
        <UserTile id={user?._id} />
      </div>

      <MessagePlayground
        messages={messages}
        className={`h-[calc(100%-70px-70px)] p-3 overflow-y-scroll ${
          theme === "dark" ? "bg-[#000]" : "bg-[#09569936]"
        }`}
      />

      <MessageInput />
    </div>
  );
};

export default MessageSection;
