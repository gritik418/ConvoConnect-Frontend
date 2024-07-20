"use client";
import React, { useContext, useMemo } from "react";
import SocketContext from "./SocketContext";
import { io } from "socket.io-client";

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:8000", {
        withCredentials: true,
      }),
    []
  );
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
