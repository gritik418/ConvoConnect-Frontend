import { changeSelectedChat } from "@/features/chat/chatSlice";
import { Avatar } from "@chakra-ui/react";
import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";

const ChatItem = ({ chat, id }: { chat: ChatType; id: string }) => {
  const dispatch = useDispatch<Dispatch<any>>();

  const handleChangeSelectedChat = () => {
    dispatch(changeSelectedChat(chat));
  };

  if (chat.is_group_chat) {
    return (
      <div
        className="p-2 flex rounded-lg bg-white"
        onClick={handleChangeSelectedChat}
      >
        <Avatar name={chat.group_name} src={chat.group_icon} />
        <div className="ml-2">
          <p className="text-lg text-gray-500">{chat.group_name}</p>
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
      className="p-2 flex rounded-lg bg-white"
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
        <p className="text-gray-400 font-medium">{sender[0].username}</p>
      </div>
    </div>
  );
};

export default ChatItem;
