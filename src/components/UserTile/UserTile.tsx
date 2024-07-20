import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
import { MdBlock } from "react-icons/md";

const UserTile = () => {
  return (
    <div className="flex items-center h-full px-5 justify-between">
      <div className="flex">
        <Avatar />
        <div className="ml-2">
          <p className="text-lg">Ritik Gupta</p>
          <p className="text-sm text-gray-400 font-bold">
            gritik418.dev@gmail.com
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
