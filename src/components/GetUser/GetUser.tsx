"use client";
import { setUser } from "@/features/user/userSlice";
import { gql, useQuery } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const GET_CURRENT_USER = gql`
  query GetUserQuery {
    getCurrentLoggedInUser {
      first_name
      last_name
      avatar
      id
      username
    }
  }
`;

const GetUser = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();

  useEffect(() => {
    if (!data?.getCurrentLoggedInUser) return;
    dispatch(setUser(data.getCurrentLoggedInUser));
  }, [data]);

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

  if ((!loading && !data.getCurrentLoggedInUser.id) || error) {
    router.push("/login");
  }

  return <>{children}</>;
};

export default GetUser;
