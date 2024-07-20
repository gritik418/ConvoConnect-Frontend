import React, { Dispatch, SetStateAction } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import FriendRequestItem from "../FriendRequestItem/FriendRequestItem";

type PropsType = {
  setShowFriendRequestModal: Dispatch<SetStateAction<boolean>>;
};

const FriendRequestModal = ({ setShowFriendRequestModal }: PropsType) => {
  return (
    <div className="fixed h-[100vh] w-[100vw] bg-slate-600 top-0  bg-opacity-40">
      <div className="max-h-[550px] rounded-xl px-6 py-4 max-w-[450px] w-[85%] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl"> Friend Requests </h1>
          <IoIosCloseCircle
            onClick={() => setShowFriendRequestModal(false)}
            className="text-2xl cursor-pointer"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3 overflow-y-scroll">
          <FriendRequestItem />
          <FriendRequestItem />
          <FriendRequestItem />
          <FriendRequestItem />
          <FriendRequestItem />
          <FriendRequestItem />
          <FriendRequestItem />
          <FriendRequestItem />
          <FriendRequestItem />
          <FriendRequestItem />
        </div>
      </div>
    </div>
  );
};

export default FriendRequestModal;
