"use client";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";
import AddStatus from "../AddStatus/AddStatus";
import FriendStatusItem from "../FriendStatusItem/FriendStatusItem";

const StatusSection = () => {
  const { theme } = useCustomTheme();

  return (
    <div
      className={`p-2 h-[90px] w-full border-b-2 ${
        theme === "dark"
          ? "border-b-[#0c0c19]"
          : "border-b-gray-200 bg-gray-300"
      }`}
    >
      <div className="px-1 h-full flex items-center w-full">
        <AddStatus />
        <div
          className={`flex scroll-smooth w-[calc(100%-80px)] gap-2 overflow-x-scroll border-l-2 p-2 ${
            theme === "dark" ? "border-gray-500" : "border-gray-100"
          }`}
        >
          <FriendStatusItem />
          <FriendStatusItem />
          <FriendStatusItem />
          <FriendStatusItem />
          <FriendStatusItem />
          <FriendStatusItem />
          <FriendStatusItem />
          <FriendStatusItem />
          <FriendStatusItem />
        </div>
      </div>
    </div>
  );
};

export default StatusSection;
