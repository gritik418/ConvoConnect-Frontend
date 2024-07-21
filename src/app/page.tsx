"use client";
import ChatSection from "@/components/ChatSection/ChatSection";
import MessageSection from "@/components/MessageSection/MessageSection";
import Navbar from "@/components/Navbar/Navbar";
import { ACTIVE_FRIENDS, OFFLINE_FRIEND } from "@/constants/events";
import { useSocket } from "@/contexts/SocketProvider";
import { getChatsAsync } from "@/features/chat/chatSlice";
import {
  getActiveFriendsAsync,
  offlineFriend,
  onlineFriend,
} from "@/features/friend/friendSlice";
import { gql, useQuery } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

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

export default function Home() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const dispatch = useDispatch<Dispatch<any>>();
  const socket: Socket = useSocket();

  const userOnlineHandler = useCallback(({ id }: { id: string }) => {
    dispatch(onlineFriend(id));
  }, []);

  const userOfflineHandler = useCallback(({ id }: { id: string }) => {
    dispatch(offlineFriend(id));
  }, []);

  useEffect(() => {
    socket.on(ACTIVE_FRIENDS, userOnlineHandler);

    socket.on(OFFLINE_FRIEND, userOfflineHandler);

    return () => {
      socket.off(ACTIVE_FRIENDS, userOnlineHandler);
      socket.off(OFFLINE_FRIEND, userOfflineHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(getChatsAsync());
    dispatch(getActiveFriendsAsync());
  }, []);
  return (
    <>
      {loading ? (
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
      ) : (
        <div className="h-[100vh]">
          <Navbar
            user={{
              first_name: data?.getCurrentLoggedInUser.first_name,
              last_name: data?.getCurrentLoggedInUser.last_name,
              avatar: data?.getCurrentLoggedInUser.avatar,
              _id: data?.getCurrentLoggedInUser.id,
              username: data?.getCurrentLoggedInUser.username,
            }}
          />
          <div className="h-[calc(100vh-60px)] flex">
            <ChatSection id={data?.getCurrentLoggedInUser.id} />
            <MessageSection
              user={{
                first_name: data?.getCurrentLoggedInUser.first_name,
                last_name: data?.getCurrentLoggedInUser.last_name,
                avatar: data?.getCurrentLoggedInUser.avatar,
                _id: data?.getCurrentLoggedInUser.id,
                username: data?.getCurrentLoggedInUser.username,
              }}
              id={data?.getCurrentLoggedInUser.id}
            />
          </div>
        </div>
      )}
    </>
  );
}
