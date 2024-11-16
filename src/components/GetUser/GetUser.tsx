"use client";
import { getFriendRequestsAsync } from "@/features/friend/friendSlice";
import { getUserAsync, selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const GetUser = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const user: UserType = useSelector(selectUser);

  useEffect(() => {
    dispatch(getFriendRequestsAsync());
    if (user?._id) return;
    dispatch(getUserAsync());
  }, [dispatch, user]);

  return <></>;
};

export default GetUser;
