import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import React from "react";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-[#ffbbbb] h-[60px] flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">ConvoConnect</h1>

        <div className="flex gap-4 items-center">
          <div className="transition-all duration-500 ease-in-out hover:bg-[#ffffff75] h-[46px] cursor-pointer rounded-full w-[46px] flex items-center justify-center">
            <FaUserFriends className="text-3xl m-2" />
          </div>
          <Menu>
            <MenuButton>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
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
    </div>
  );
};

export default Navbar;
