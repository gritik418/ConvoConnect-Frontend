"use client";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";
import AddStatus from "../AddStatus/AddStatus";
import FriendStatusItem from "../FriendStatusItem/FriendStatusItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  getUserStatusAsync,
  selectStatus,
} from "@/features/status/statusSlice";
import UserStatus from "../UserStatus/UserStatus";

const StatusSection = () => {
  const { theme } = useCustomTheme();
  const dispatch = useDispatch<Dispatch<any>>();
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(getUserStatusAsync());
  }, []);
  console.log(status);
  return (
    <div
      className={`p-2 h-[90px] w-full border-b-2 ${
        theme === "dark"
          ? "border-b-[#0c0c19]"
          : "border-b-gray-200 bg-gray-300"
      }`}
    >
      <div className="px-1 h-full flex items-center w-full">
        {status && status._id ? <UserStatus /> : <AddStatus />}
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
