import React from "react";
import { IoSend } from "react-icons/io5";

const MessageInput = () => {
  return (
    <div className="h-[70px] flex items-center px-4 py-3 gap-4">
      <input
        type="text"
        placeholder="Type here..."
        className="border-2 w-full py-3 px-3 rounded-md outline-none text-xl text-gray-500"
      />
      <div className="w-[70px] cursor-pointer bg-gray-300 h-[55px] grid place-items-center rounded-md">
        <IoSend className="text-black text-3xl" />
      </div>
    </div>
  );
};

export default MessageInput;
