"use client";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { selectActiveFriends } from "@/features/friend/friendSlice";
import { Avatar } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ChatItem = ({ chat, id }: { chat: ChatType; id: string }) => {
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const activeFriends: string[] = useSelector(selectActiveFriends);
  const router = useRouter();

  const handleChangeSelectedChat = () => {
    router.push(`/chat/${chat._id}`);
  };

  if (chat.is_group_chat) {
    return (
      <div
        className={`p-2 flex rounded-lg cursor-pointer ${
          selectedChat._id === chat._id
            ? "bg-white border-[3px] border-gray-300"
            : "bg-slate-50"
        }`}
        onClick={handleChangeSelectedChat}
      >
        <Avatar name={chat.group_name} src={chat.group_icon} />
        <div className="ml-2">
          <p className="text-lg text-gray-500">{chat.group_name}</p>
          <p>{chat.last_message?.content}</p>
        </div>
      </div>
    );
  }

  const sender: ChatMemberType[] = chat.members.filter(
    (member: ChatMemberType) => {
      return member._id !== id;
    }
  );

  return (
    <div
      className={`p-2 flex rounded-lg cursor-pointer relative ${
        selectedChat._id === chat._id
          ? "bg-white border-[3px] border-gray-300"
          : "bg-slate-50"
      }`}
      onClick={handleChangeSelectedChat}
    >
      <Avatar
        name={`${sender[0].first_name} ${sender[0].last_name}`}
        src={sender[0].avatar || ""}
      />
      <div className="ml-2">
        <p className="text-lg font-semibold text-gray-500">
          {sender[0].first_name} {sender[0].last_name}
        </p>
        <p className="text-gray-400 font-medium">
          {chat.last_message?.content}
        </p>
      </div>
      {activeFriends.includes(sender[0]._id) && (
        <span className="bg-green-500 h-3 w-3 rounded-full absolute right-3 bottom-3"></span>
      )}
    </div>
  );
};

export default ChatItem;
