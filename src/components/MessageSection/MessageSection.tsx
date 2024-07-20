import React from "react";
import UserTile from "../UserTile/UserTile";
import MessagePlayground from "../MessagePlayground/MessagePlayground";
import MessageInput from "../MessageInput/MessageInput";

const MessageSection = () => {
  return (
    <div className="border-2 w-full h-full bg-gray-50 flex flex-col">
      <div className="h-[68px] bg-gray-200 border-b-2">
        <UserTile />
      </div>

      <MessagePlayground className="h-[calc(100%-68px-70px)] border-2 p-3" />

      <MessageInput />
    </div>
  );
};

export default MessageSection;
