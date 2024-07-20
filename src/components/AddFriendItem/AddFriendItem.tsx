import { Avatar } from "@chakra-ui/react";
import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { SearchedUserType } from "../AddFriendModal/AddFriendModal";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { sendFriendRequestAsync } from "@/features/friend/friendSlice";

const AddFriendItem = ({ user }: { user: SearchedUserType }) => {
  const dispatch = useDispatch<Dispatch<any>>();

  const handleSendFriendRequest = () => {
    dispatch(sendFriendRequestAsync(user._id));
  };
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
      <div className="flex">
        <Avatar
          name={`${user.first_name} ${user.last_name}`}
          src={user.avatar}
        />
        <div className="ml-2">
          <p className="text-lg">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-400 font-bold">{user.username}</p>
        </div>
      </div>
      <div
        onClick={handleSendFriendRequest}
        className="transition-all duration-400 ease-in-out bg-gray-200 hover:bg-gray-300 h-[40px] w-[40px] flex items-center justify-center rounded-full"
      >
        <LuUserPlus className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default AddFriendItem;
