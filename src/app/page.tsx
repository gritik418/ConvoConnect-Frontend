"use client";
import Layout from "@/components/Layout/Layout";
import { getActiveFriendsAsync } from "@/features/friend/friendSlice";
import { selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getActiveFriendsAsync());
  }, []);
  return (
    <Layout>
      <div className="hidden sm:flex w-full border-2 h-full bg-gray-50 flex-col items-center justify-center">
        <p className="text-lg">
          {" "}
          {user?._id ? "Please Select a Chat" : "Please Login"}
        </p>
      </div>
    </Layout>
  );
};

export default Home;
