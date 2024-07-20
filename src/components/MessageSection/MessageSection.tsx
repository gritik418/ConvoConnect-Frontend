import React from "react";
import UserTile from "../UserTile/UserTile";

const MessageSection = () => {
  return (
    <div className="border-2 w-full h-full bg-gray-50">
      <div className="h-[68px] bg-gray-200 border-b-2">
        <UserTile />
      </div>
    </div>
  );
};

export default MessageSection;
