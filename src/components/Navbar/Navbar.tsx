"use client";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { getUserAsync, selectUser } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { PiUserCirclePlusBold } from "react-icons/pi";
import Image from "next/image";

type UserType = {
  _id: string;
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
  const router = useRouter();

  const handleShowFriendRequests = () => {
    dispatch(getFriendRequestsAsync());
    setShowFriendRequestModal(true);
  };

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <div className="bg-[#095699] h-[60px] flex items-center px-2 lg:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={"/"}
          className="text-xl sm:text-3xl items-center text-white font-bold flex gap-2"
        >
          <Image src={"/images/logo.png"} height={40} width={40} alt="logo" />
          <h1 className="hidden sm:flex">ConvoConnect</h1>
        </Link>

        {user?._id ? (
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
                    name={`${user?.first_name} ${user?.last_name}`}
                    src={user?.avatar}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    className="gap-2"
                    onClick={() => router.push("/profile")}
                  >
                    <FaUser className="text-lg font-bold" /> Profile
                  </MenuItem>
                  <MenuItem
                    className="gap-2"
                    onClick={() => router.push("/group/create")}
                  >
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
                    name={`${user?.first_name} ${user?.last_name}`}
                    src={user?.avatar}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    className="gap-2"
                    onClick={() => router.push("/profile")}
                  >
                    <FaUser className="text-lg font-bold" /> Profile
                  </MenuItem>
                  <MenuItem
                    className="gap-2"
                    onClick={() => router.push("/group/create")}
                  >
                    <MdGroups className="text-xl font-bold" /> Create New Group
                  </MenuItem>
                  <MenuItem
                    className="gap-2"
                    onClick={handleShowFriendRequests}
                  >
                    <FaUserFriends className="text-xl font-bold" /> Friend
                    Requests
                  </MenuItem>
                  <MenuItem
                    className="gap-2"
                    onClick={() => setShowAddFriendModal(true)}
                  >
                    <FaUserPlus className="text-xl font-bold" /> Add New Friends
                  </MenuItem>
                  <MenuItem className="gap-2">
                    <TbLogout2 className="text-xl font-bold" />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden sm:flex gap-4 items-center">
              <Link
                href={"/login"}
                className="py-2 text-lg hover:bg-gray-200 px-4 flex font-semibold bg-white transition-all duration-500 ease-in-out text-[#106ab9] cursor-pointer rounded-md items-center justify-center"
              >
                Login <FiLogIn className="text-2xl ml-2" />
              </Link>
              <Link
                href={"/signup"}
                className="py-2 text-lg hover:bg-gray-200 px-4 flex font-semibold bg-white transition-all duration-500 ease-in-out text-[#106ab9] cursor-pointer rounded-md items-center justify-center"
              >
                Sign Up
                <PiUserCirclePlusBold className="text-2xl ml-2" />
              </Link>
            </div>

            <div className="flex sm:hidden gap-4 items-center">
              <Link
                href={"/login"}
                className="py-2 text-lg hover:bg-gray-200 px-4 flex font-semibold bg-white transition-all duration-500 ease-in-out text-[#106ab9] cursor-pointer rounded-md items-center justify-center"
              >
                Login
              </Link>

              <Link
                href={"/signup"}
                className="py-2 text-lg hover:bg-gray-200 px-4 flex font-semibold bg-white transition-all duration-500 ease-in-out text-[#106ab9] cursor-pointer rounded-md items-center justify-center"
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
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
