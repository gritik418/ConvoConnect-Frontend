"use client";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";
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
  const { theme } = useCustomTheme();

  const handleChangeSelectedChat = () => {
    router.push(`/chat/${chat._id}`);
  };

  if (chat.is_group_chat) {
    return (
      <div
        className={`p-2 flex rounded-lg cursor-pointer ${
          selectedChat._id === chat._id
            ? theme === "dark"
              ? "bg-[#000] border-[3px] border-black"
              : "bg-white border-[3px] border-gray-300"
            : theme === "dark"
            ? "bg-[#1c1c29]"
            : "bg-slate-50"
        }`}
        onClick={handleChangeSelectedChat}
      >
        <Avatar
          name={chat.group_name}
          className="rounded-md overflow-hidden"
          src={chat.group_icon}
        />
        <div className="ml-2">
          <p
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-500"
            }`}
          >
            {chat.group_name}
          </p>
          <p className="text-lg font-medium text-gray-400">
            {chat.last_message?.content}
          </p>
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
      className={`p-2 flex rounded-lg relative cursor-pointer ${
        selectedChat._id === chat._id
          ? theme === "dark"
            ? "bg-[#000] border-[3px] border-black"
            : "bg-white border-[3px] border-gray-300"
          : theme === "dark"
          ? "bg-[#1c1c29]"
          : "bg-slate-50"
      }`}
      onClick={handleChangeSelectedChat}
    >
      <Avatar
        className="rounded-md overflow-hidden"
        name={`${sender[0].first_name} ${sender[0].last_name}`}
        src={sender[0].avatar || ""}
      />
      <div className="ml-2">
        <p
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-500"
          }`}
        >
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
