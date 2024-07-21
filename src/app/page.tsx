"use client";
import ChatSection from "@/components/ChatSection/ChatSection";
import MessageSection from "@/components/MessageSection/MessageSection";
import Navbar from "@/components/Navbar/Navbar";
import { useSocket } from "@/contexts/SocketProvider";
import { getChatsAsync } from "@/features/chat/chatSlice";
import { gql, useQuery } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GET_CURRENT_USER = gql`
  query GetUserQuery {
    getCurrentLoggedInUser {
      first_name
      last_name
      avatar
      id
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const dispatch = useDispatch<Dispatch<any>>();
  const socket = useSocket();

  useEffect(() => {
    dispatch(getChatsAsync());
  }, []);
  return (
    <>
      {loading ? (
        <div className="h-[100vh] w-[100vw] grid place-items-center">
          <Image
            className="mt-10"
            src={"/images/loading.gif"}
            alt="loading"
            height={120}
            width={120}
          />
        </div>
      ) : (
        <div className="h-[100vh]">
          <Navbar
            user={{
              first_name: data?.getCurrentLoggedInUser.first_name,
              last_name: data?.getCurrentLoggedInUser.last_name,
              avatar: data?.getCurrentLoggedInUser.avatar,
              _id: data?.getCurrentLoggedInUser.id,
            }}
          />
          <div className="h-[calc(100vh-60px)] flex">
            <ChatSection id={data?.getCurrentLoggedInUser.id} />
            <MessageSection />
          </div>
        </div>
      )}
    </>
  );
}
