import { Avatar } from "@chakra-ui/react";
import React from "react";
import { TiTick } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";

const FriendRequestItem = () => {
  return (
    <div className="bg-gray-200 rounded-lg p-2">
      <div className="flex">
        <Avatar name="Ritik" src="" />
        <div className="ml-2">
          <p>Ritik Gupta</p>
          <p className="text-gray-400 font-bold">gritik418.dev@gmail.com</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-2">
        <button className="h-[35px] grid place-items-center w-[40px] rounded-md bg-gray-50 text-red-500">
          <FaRegTrashAlt className="text-xl" />
        </button>
        <button className="bg-green-600 text-white h-[35px] grid place-items-center w-[40px] rounded-md">
          <TiTick className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
