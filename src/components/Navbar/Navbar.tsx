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
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { getFriendRequestsAsync } from "@/features/friend/friendSlice";
import { selectUser } from "@/features/user/userSlice";

type UserType = {
  id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const Navbar = () => {
  const [showAddFriendModal, setShowAddFriendModal] = useState<boolean>(false);
  const [showFriendRequestModal, setShowFriendRequestModal] =
    useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const user: UserType = useSelector(selectUser);

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
            className="hidden sm:flex text-white transition-all duration-500 ease-in-out hover:bg-[#278ee8cf] h-[46px] cursor-pointer rounded-full w-[46px] items-center justify-center"
          >
            <FaUserPlus className="text-3xl m-2" />
          </div>
          <div
            onClick={handleShowFriendRequests}
            className="hidden sm:flex text-white transition-all duration-500 ease-in-out hover:bg-[#278ee8cf] h-[46px] cursor-pointer rounded-full w-[46px] items-center justify-center"
          >
            <FaUserFriends className="text-3xl m-2" />
          </div>

          <div className="hidden sm:flex">
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

          <div className="flex sm:hidden">
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
                  <FaUserFriends className="text-xl font-bold" /> Friend
                  Requests
                </MenuItem>
                <MenuItem className="gap-2">
                  <FaUserPlus className="text-xl font-bold" /> Add New Friend
                </MenuItem>
                <MenuItem className="gap-2">
                  <TbLogout2 className="text-xl font-bold" />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
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
