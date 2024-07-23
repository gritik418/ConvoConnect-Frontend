"use client";
import { selectUser, setUser } from "@/features/user/userSlice";
import { gql, useQuery } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type UserType = {
  id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const GET_CURRENT_USER = gql`
  query GetUserQuery {
    getCurrentLoggedInUser {
      first_name
      last_name
      email
      avatar
      id
      username
      bio
    }
  }
`;

const GetUser = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const dispatch = useDispatch<Dispatch<any>>();
  const user: UserType = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user.id) return;
    if (!data?.getCurrentLoggedInUser) return;
    dispatch(setUser(data.getCurrentLoggedInUser));
  }, [data]);

  if (user?.id) return <>{children}</>;

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

  if ((!loading && !data?.getCurrentLoggedInUser?.id) || error) {
    router.push("/login");
  }

  return <>{children}</>;
};

export default GetUser;
