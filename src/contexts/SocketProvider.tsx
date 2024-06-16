"use client";
import React, { useContext, useMemo } from "react";
import SocketContext from "./SocketContext";
import io from "socket.io-client";

export const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_SOCKET_URL!), []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
