import { selectUser } from "@/features/user/userSlice";
import { Avatar, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import UserStatusPreview from "../UserStatusPreview/UserStatusPreview";

const UserStatus = () => {
  const user: UserType = useSelector(selectUser);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <div
        onClick={onOpen}
        className="cursor-pointer h-[65px] mr-2 w-[65px] relative rounded-full border-[3px] border-green-500"
      >
        <Avatar
          className="min-h-full min-w-full"
          src={user.avatar || ""}
          name={`${user.first_name} ${user.last_name}`}
        />
      </div>

      <UserStatusPreview isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default UserStatus;
