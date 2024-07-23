"use client";
import {
  getUserAsync,
  selectUser,
  selectUserLoading,
} from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const GetUser = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const user: UserType = useSelector(selectUser);
  const router = useRouter();
  const loading: boolean = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-[100vh] w-[100vw] grid place-items-center">
        <Image
          className="mt-10"
          src={"/images/loading.gif"}
          alt="loading"
          priority={true}
          height={120}
          width={120}
        />
      </div>
    );
  }

  if (!loading && !user?._id) {
    router.push("/login");
  }

  return <>{children}</>;
};

export default GetUser;
