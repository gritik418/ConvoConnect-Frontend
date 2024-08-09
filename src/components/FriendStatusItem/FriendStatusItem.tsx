import { selectUser } from "@/features/user/userSlice";
import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const FriendStatusItem = () => {
  const user: UserType = useSelector(selectUser);
  return (
    <div className="min-h-[58px] h-[58px] min-w-[58px] w-[58px] rounded-full border-2">
      <Avatar
        className="min-h-full min-w-full"
        src={user.avatar || ""}
        name="Ritik Gupta"
      />
    </div>
  );
};

export default FriendStatusItem;
