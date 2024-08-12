import { Avatar } from "@chakra-ui/react";
import React from "react";
import { TiTick } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { FriendRequestType } from "../FriendRequestModal/FriendRequestModal";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  acceptFriendRequestAsync,
  declineFriendRequestAsync,
} from "@/features/friend/friendSlice";

const FriendRequestItem = ({
  friendRequest,
}: {
  friendRequest: FriendRequestType;
}) => {
  const dispatch = useDispatch<Dispatch<any>>();

  const handleAcceptFriendRequest = () => {
    if (!friendRequest?._id) return;
    dispatch(acceptFriendRequestAsync(friendRequest?._id));
  };

  const handleDeclineFriendRequest = () => {
    if (!friendRequest?._id) return;
    dispatch(declineFriendRequestAsync(friendRequest?._id));
  };
  return (
    <div className="bg-gray-200 rounded-lg p-2">
      <div className="flex">
        <Avatar
          name={`${friendRequest.first_name} ${friendRequest.last_name}`}
          src=""
        />
        <div className="ml-2">
          <p>
            {friendRequest.first_name} {friendRequest.last_name}
          </p>
          <p className="text-gray-400 font-bold">{friendRequest.username}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-2">
        <button className="h-[35px] grid place-items-center w-[40px] rounded-md bg-gray-50 text-red-500">
          <FaRegTrashAlt
            className="text-xl"
            onClick={handleDeclineFriendRequest}
          />
        </button>
        <button className="bg-green-600 text-white h-[35px] grid place-items-center w-[40px] rounded-md">
          <TiTick className="text-2xl" onClick={handleAcceptFriendRequest} />
        </button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
