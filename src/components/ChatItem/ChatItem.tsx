import { Avatar } from "@chakra-ui/react";
import React from "react";

const ChatItem = () => {
  return (
    <div className="p-2 flex rounded-lg bg-white">
      <Avatar name="Ritik Gupta" />
      <div className="ml-2">
        <p className="text-lg text-gray-500">Ritik Gupta</p>
        <p className="text-gray-400">gritik418.dev@gmail.com</p>
      </div>
    </div>
  );
};

export default ChatItem;
