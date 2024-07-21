"use client";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import AddFriendModal from "../AddFriendModal/AddFriendModal";
import FriendRequestModal from "../FriendRequestModal/FriendRequestModal";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { getFriendRequestsAsync } from "@/features/friend/friendSlice";

type PropsType = {
  user: {
    _id: string;
    first_name: string;
    last_name?: string;
    avatar?: string;
    username: string;
  };
};

const Navbar = ({ user }: PropsType) => {
  const [showAddFriendModal, setShowAddFriendModal] = useState<boolean>(false);
  const [showFriendRequestModal, setShowFriendRequestModal] =
    useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleShowFriendRequests = () => {
    dispatch(getFriendRequestsAsync());
    setShowFriendRequestModal(true);
  };

  return (
    <div className="bg-[#095699] h-[60px] flex items-center px-2 lg:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">ConvoConnect</h1>

        <div className="flex gap-4 items-center">
          <div
            onClick={() => setShowAddFriendModal(true)}
            className="text-white transition-all duration-500 ease-in-out hover:bg-[#278ee8cf] h-[46px] cursor-pointer rounded-full w-[46px] flex items-center justify-center"
          >
            <FaUserPlus className="text-3xl m-2" />
          </div>
          <div
            onClick={handleShowFriendRequests}
            className="text-white transition-all duration-500 ease-in-out hover:bg-[#278ee8cf] h-[46px] cursor-pointer rounded-full w-[46px] flex items-center justify-center"
          >
            <FaUserFriends className="text-3xl m-2" />
          </div>
          <Menu>
            <MenuButton>
              <Avatar
                name={`${user.first_name} ${user.last_name}`}
                src={user.avatar}
              />
            </MenuButton>
            <MenuList>
              <MenuItem className="gap-2">
                <FaUser className="text-lg font-bold" /> Profile
              </MenuItem>
              <MenuItem className="gap-2">
                <MdGroups className="text-xl font-bold" /> Create New Group
              </MenuItem>
              <MenuItem className="gap-2">
                <TbLogout2 className="text-xl font-bold" />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      {showFriendRequestModal && (
        <FriendRequestModal
          setShowFriendRequestModal={setShowFriendRequestModal}
        />
      )}

      {showAddFriendModal && (
        <AddFriendModal setShowAddFriendModal={setShowAddFriendModal} />
      )}
    </div>
  );
};

export default Navbar;
