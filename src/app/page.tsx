"use client";
import Layout from "@/components/Layout/Layout";
import { ACTIVE_FRIENDS, OFFLINE_FRIEND } from "@/constants/events";
import { useSocket } from "@/contexts/SocketProvider";
import { getChatsAsync } from "@/features/chat/chatSlice";
import {
  getActiveFriendsAsync,
  offlineFriend,
  onlineFriend,
} from "@/features/friend/friendSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

const Home = () => {
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
    <Layout>
      <div className="border-2 w-full h-full bg-gray-50 flex flex-col items-center justify-center">
        <p>Please Select a Chat</p>
      </div>
    </Layout>
  );
};

export default Home;
