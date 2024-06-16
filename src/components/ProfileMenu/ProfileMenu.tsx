import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { UserDataType, selectUser } from "@/features/user/userSlice";
import { useSelector } from "react-redux";

const ProfileMenu = () => {
  const user: UserDataType = useSelector(selectUser);
  return (
    <Menu>
      <MenuButton>
        <Avatar
          name="Dan Abrahmov"
          src={user.avatar || "https://bit.ly/dan-abramov"}
        />
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
