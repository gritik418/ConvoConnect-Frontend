import { Avatar } from "@chakra-ui/react";
import React from "react";
import { LuUserPlus } from "react-icons/lu";

const AddFriendItem = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
      <div className="flex">
        <Avatar name="Ritik gupta" />
        <div className="ml-2">
          <p className="text-lg">Ritik Gupta</p>
          <p className="text-sm text-gray-400 font-bold">
            gritik418.dev@gmail.com
          </p>
        </div>
      </div>
      <div className="transition-all duration-400 ease-in-out bg-gray-200 hover:bg-gray-300 h-[40px] w-[40px] flex items-center justify-center rounded-full">
        <LuUserPlus className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default AddFriendItem;
