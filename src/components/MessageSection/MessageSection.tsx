import React, { useEffect } from "react";
import UserTile from "../UserTile/UserTile";
import MessagePlayground from "../MessagePlayground/MessagePlayground";
import MessageInput from "../MessageInput/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { useSocket } from "@/contexts/SocketProvider";
import { NEW_MESSAGE } from "@/constants/events";
import { Dispatch } from "@reduxjs/toolkit";
import { getMessagesAsync } from "@/features/message/messageSlice";

const MessageSection = ({ id }: { id: string }) => {
  const selectedChat: ChatType = useSelector(selectSelectedChat);
  const dispatch = useDispatch<Dispatch<any>>();
  const socket = useSocket();

  useEffect(() => {
    socket.on(NEW_MESSAGE, (data: any) => {
      console.log(data);
    });

    () => {
      socket.off(NEW_MESSAGE);
    };
  }, [socket]);

  useEffect(() => {
    if (!selectedChat._id) return;
    dispatch(getMessagesAsync(selectedChat._id));
  }, [selectedChat]);

  if (!selectedChat._id)
    return (
      <div className="border-2 w-full h-full bg-gray-50 flex flex-col items-center justify-center">
        <p>Please Select a Chat</p>
      </div>
    );

  return (
    <div className="border-2 w-full h-full bg-gray-50 flex flex-col">
      <div className="h-[68px] bg-gray-200 border-b-2">
        <UserTile id={id} />
      </div>

      <MessagePlayground className="h-[calc(100%-68px-70px)] p-3" />

      <MessageInput />
    </div>
  );
};

export default MessageSection;
