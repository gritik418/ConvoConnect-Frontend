"use client";
import React, { useEffect, useState } from "react";
import UserTile from "../UserTile/UserTile";
import MessagePlayground from "../MessagePlayground/MessagePlayground";
import MessageInput from "../MessageInput/MessageInput";
import { useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { selectMessages } from "@/features/message/messageSlice";
import { selectUser } from "@/features/user/userSlice";

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

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  if (!selectedChat._id)
    return (
      <div className="border-2 w-full h-full bg-gray-50 flex flex-col items-center justify-center">
        <p>Please Select a Chat</p>
      </div>
    );

  return (
    <div className="border-2 w-full h-full bg-gray-50 flex flex-col">
      <div className="h-[68px] bg-gray-200 border-b-2">
        <UserTile id={user?._id} />
      </div>

      <MessagePlayground
        messages={messages}
        className="h-[calc(100%-68px-70px)] p-3 bg-[#09569936] overflow-y-scroll"
      />

      <MessageInput />
    </div>
  );
};

export default MessageSection;
