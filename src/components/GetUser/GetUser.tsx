"use client";
import {
  getUserAsync,
  selectUser,
  selectUserLoading,
} from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
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
    if (user?._id) return;
    dispatch(getUserAsync());
  }, [dispatch]);

  return <></>;
};

export default GetUser;
