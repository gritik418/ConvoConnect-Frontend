"use client";
import React from "react";
import ChatItem from "../ChatItem/ChatItem";
import { useSelector } from "react-redux";
import { selectChats } from "@/features/chat/chatSlice";
import { selectUser } from "@/features/user/userSlice";

type UserType = {
  id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const ChatSection = () => {
  const chats: ChatType[] | [] = useSelector(selectChats);
  const user: UserType = useSelector(selectUser);

  return (
    <div className="w-[450px] h-full py-3 bg-gray-50">
      <div className="px-2 h-[58px] border-b-gray-200 border-b-2 pb-3">
        <input
          type="text"
          placeholder="Search here..."
          className="border-2 w-full p-2 rounded-md outline-[#ffbbbb]"
        />
      </div>
      <div className="p-4 bg-gray-200 h-[calc(100%-44px)] flex flex-col overflow-y-scroll gap-3">
        {chats.map((chat: ChatType) => {
          return <ChatItem key={chat._id} id={user.id} chat={chat} />;
        })}
      </div>
    </div>
  );
};

export default ChatSection;