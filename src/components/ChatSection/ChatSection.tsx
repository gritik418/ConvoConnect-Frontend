"use client";
import React, { useEffect, useState } from "react";
import ChatItem from "../ChatItem/ChatItem";
import { useSelector } from "react-redux";
import { selectChats, selectChatsLoading } from "@/features/chat/chatSlice";
import { selectUser } from "@/features/user/userSlice";
import ChatSkeleton from "../ChatSkeleton/ChatSkeleton";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const ChatSection = () => {
  const initialChats: ChatType[] | [] = useSelector(selectChats);
  const user: UserType = useSelector(selectUser);
  const loading: boolean = useSelector(selectChatsLoading);
  const [chats, setChats] = useState<any>(initialChats);

  useEffect(() => {
    const sortedChats = Object.values(initialChats).sort(
      (a: ChatType, b: ChatType) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
    );
    setChats(sortedChats);
  }, [initialChats]);

  return (
    <div className="w-full h-full py-3 bg-gray-50">
      <div className="px-2 h-[58px] border-b-gray-200 border-b-2 pb-3">
        <input
          type="text"
          placeholder="Search here..."
          className="border-2 w-full p-2 rounded-md outline-[#ffbbbb]"
        />
      </div>
      <div className="p-4 bg-gray-200 h-[calc(100%-44px)] flex flex-col overflow-y-scroll gap-3">
        {loading ? (
          <ChatSkeleton />
        ) : (
          <>
            {Object.values(chats).map((chat: ChatType | any) => {
              return <ChatItem key={chat._id} id={user?._id} chat={chat} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
