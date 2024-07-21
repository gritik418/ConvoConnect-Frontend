import { Avatar } from "@chakra-ui/react";
import React from "react";

const MessageItem = ({
  message,
  userId,
}: {
  userId: string;
  message?: MessageType;
}) => {
  if (message?.sender._id.toString() === userId.toString()) {
    return (
      <div className="place-self-end flex gap-2 mb-2 justify-self-end">
        <div className="bg-[#095699] text-white py-1 px-4 rounded-xl flex items-end gap-3">
          <p>{message.content}</p>
          <p className="text-[10px] font-bold text-gray-200">7:47 P.M.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mb-2">
      <Avatar
        name={`${message?.sender.first_name} ${message?.sender?.last_name}`}
        className="text-sm"
        size={"xs"}
        src={message?.sender.avatar || ""}
      />
      <div className="bg-white text-black py-1 px-4 rounded-xl flex items-end gap-3">
        <p>{message?.content}</p>
        <p className="text-[10px] font-bold text-black">7:47 P.M.</p>
      </div>
    </div>
  );
};

export default MessageItem;
