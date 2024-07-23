import { selectUser } from "@/features/user/userSlice";
import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const MessageItem = ({ message }: { message?: MessageType }) => {
  const user: UserType = useSelector(selectUser);

  if (message?.sender._id === user._id) {
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
