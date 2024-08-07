"use client";
import Layout from "@/components/Layout/Layout";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";
import { getActiveFriendsAsync } from "@/features/friend/friendSlice";
import { selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  email?: string;
  username: string;
  background?: string;
};

const Home = () => {
  const user: UserType = useSelector(selectUser);
  const dispatch = useDispatch<Dispatch<any>>();
  const { theme } = useCustomTheme();

  useEffect(() => {
    dispatch(getActiveFriendsAsync());
  }, []);
  return (
    <Layout>
      <div
        className={`hidden sm:flex w-full h-full ${
          theme === "dark" ? "bg-[#1f1f2f] text-white" : "bg-gray-50"
        } flex-col items-center justify-center`}
      >
        <p className="text-lg">
          {" "}
          {user?._id ? "Please Select a Chat" : "Please Login"}
        </p>
      </div>
    </Layout>
  );
};

export default Home;
