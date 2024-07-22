"use client";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/navigation";

const UserTile = ({ id }: { id: string }) => {
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const router = useRouter();

  const handleClickBack = () => {
    router.push("/");
  };

  if (!selectedChat) return;

  if (selectedChat.is_group_chat) {
    return (
      <div className="flex items-center h-full px-5 justify-between">
        <div className="flex items-center">
          <button
            onClick={handleClickBack}
            className="flex justify-center rounded-md sm:hidden items-center mr-3 bg-white h-[40px] w-[40px]"
          >
            <MdOutlineKeyboardBackspace className="text-2xl" />
          </button>

          <Avatar
            name={selectedChat.group_name}
            src={selectedChat.group_icon || ""}
          />
          <div className="ml-2">
            <p className="text-lg">{selectedChat.group_name}</p>
          </div>
        </div>

        <Menu>
          <MenuButton>
            <div className="h-[40px] shadow-md shadow-gray-200 w-[40px] cursor-pointer grid place-items-center rounded-md bg-white">
              <MdOutlineMoreVert className="text-2xl" />
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem className="gap-3">
              <FaUser /> Group Info
            </MenuItem>
            <MenuItem className="gap-3">
              <MdBlock /> Block
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }

  const sender: ChatMemberType[] = selectedChat.members?.filter(
    (member: ChatMemberType) => {
      return member._id !== id;
    }
  );

  return (
    <div className="flex items-center h-full px-5 justify-between">
      <div className="flex items-center">
        <button
          onClick={handleClickBack}
          className="flex justify-center rounded-md sm:hidden items-center mr-3 bg-white h-[40px] w-[40px]"
        >
          <MdOutlineKeyboardBackspace className="text-2xl" />
        </button>

        <Avatar
          name={`${sender[0].first_name} ${sender[0].last_name}`}
          src={sender[0].avatar || ""}
        />

        <div className="ml-2">
          <p className="text-lg">
            {sender[0].first_name} {sender[0].last_name}
          </p>
          <p className="text-sm text-gray-400 font-bold">
            {sender[0].username}
          </p>
        </div>
      </div>

      <Menu>
        <MenuButton>
          <div className="h-[40px] shadow-md shadow-gray-200 w-[40px] cursor-pointer grid place-items-center rounded-md bg-white">
            <MdOutlineMoreVert className="text-2xl" />
          </div>
        </MenuButton>
        <MenuList>
          <MenuItem className="gap-3">
            <FaUser /> User Profile
          </MenuItem>
          <MenuItem className="gap-3">
            <MdBlock /> Block
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default UserTile;
