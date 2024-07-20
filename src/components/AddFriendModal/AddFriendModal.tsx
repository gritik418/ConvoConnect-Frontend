import React, { Dispatch, SetStateAction } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import AddFriendItem from "../AddFriendItem/AddFriendItem";

type PropsType = {
  setShowAddFriendModal: Dispatch<SetStateAction<boolean>>;
};
const AddFriendModal = ({ setShowAddFriendModal }: PropsType) => {
  return (
    <div className="fixed h-[100vh] w-[100vw] bg-slate-600 top-0  bg-opacity-40">
      <div className="max-h-[600px] rounded-xl px-6 py-4 max-w-[450px] w-[85%] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl"> Add Friend </h1>
          <IoIosCloseCircle
            onClick={() => setShowAddFriendModal(false)}
            className="text-2xl cursor-pointer"
          />
        </div>
        <input
          type="text"
          className="border-2 rounded-lg mt-4 px-4 py-2 focus:outline-[#ffbbbb]"
          placeholder="Search here...."
        />
        <div className="mt-8 flex flex-col gap-3 overflow-y-scroll pb-8">
          <AddFriendItem />
          <AddFriendItem />
          <AddFriendItem />
          <AddFriendItem />
          <AddFriendItem />
          <AddFriendItem />
          <AddFriendItem />
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
