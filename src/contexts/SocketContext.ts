import { createContext } from "react";
import { Socket } from "socket.io-client";

export type SocketType = Socket;

const SocketContext = createContext<SocketType | null>(null);

export default SocketContext;
