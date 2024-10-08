"use client";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IoIosCloseCircle } from "react-icons/io";
import AddFriendItem from "../AddFriendItem/AddFriendItem";
import { useDispatch, useSelector } from "react-redux";
import {
  searchUsersAsync,
  selectSearchedUsers,
} from "@/features/friend/friendSlice";

type PropsType = {
  setShowAddFriendModal: Dispatch<SetStateAction<boolean>>;
};

export type SearchedUserType = {
  first_name: string;
  last_name?: string;
  username: string;
  _id: string;
  avatar?: string;
};

const AddFriendModal = ({ setShowAddFriendModal }: PropsType) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("Type to search.");
  const dispatch = useDispatch<any>();

  const searchedUsers: SearchedUserType[] | [] =
    useSelector(selectSearchedUsers);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (searchQuery.length > 2) {
        setError("");
        dispatch(searchUsersAsync(searchQuery));
      } else {
        setError("Type atleast three characters.");
      }
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery, dispatch]);

  return (
    <div className="fixed z-10 h-[100vh] w-[100vw] bg-slate-600 top-0 left-0  bg-opacity-40">
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
          value={searchQuery}
          onChange={handleChange}
          className="border-2 rounded-lg mt-4 px-4 py-2 focus:outline-[#ffbbbb]"
          placeholder="Search here...."
        />
        <div className="mt-8 flex flex-col gap-3 overflow-y-scroll pb-8">
          {searchedUsers.length > 0 ? (
            searchedUsers.map((user: SearchedUserType) => {
              return <AddFriendItem user={user} key={user?._id} />;
            })
          ) : (
            <>{error ? <p>{error}</p> : <p>User not found.</p>}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
