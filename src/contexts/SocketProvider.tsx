"use client";
import { useContext, useMemo } from "react";
import SocketContext from "./SocketContext";
import io from "socket.io-client";

export const getSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const socket = useMemo(() => io("http://localhost:8000"), []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
