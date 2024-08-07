"use client";
import React, { useContext, useMemo } from "react";
import SocketContext from "./SocketContext";
import { io } from "socket.io-client";

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(
    () =>
      io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
        withCredentials: true,
        transports: ["websocket"],
      }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
