import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import React from "react";

const ProfileMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>
          <FiLogOut /> Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
