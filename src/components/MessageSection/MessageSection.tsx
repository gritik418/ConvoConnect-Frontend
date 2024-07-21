import React, { useCallback, useEffect } from "react";
import UserTile from "../UserTile/UserTile";
import MessagePlayground from "../MessagePlayground/MessagePlayground";
import MessageInput from "../MessageInput/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedChat } from "@/features/chat/chatSlice";
import { useSocket } from "@/contexts/SocketProvider";
import { NEW_MESSAGE } from "@/constants/events";
import { Dispatch } from "@reduxjs/toolkit";
import { addMessage, getMessagesAsync } from "@/features/message/messageSlice";

type PropsType = {
  user: {
    _id: string;
    first_name: string;
    last_name?: string;
    avatar?: string;
    username: string;
  };
  id: string;
};

const MessageSection = ({ id, user }: PropsType) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const socket = useSocket();
  const selectedChat: ChatType = useSelector(selectSelectedChat);

  const newMessageHandler = useCallback(
    ({ chat, message }: { chat: ChatType; message: MessageType }) => {
      dispatch(addMessage({ chat, message }));
    },
    []
  );

  useEffect(() => {
    socket.on(NEW_MESSAGE, newMessageHandler);

    return () => {
      socket.off(NEW_MESSAGE, newMessageHandler);
    };
  }, []);

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

      <MessagePlayground
        userId={id}
        className="h-[calc(100%-68px-70px)] p-3 bg-[#09569936] overflow-y-scroll"
      />

      <MessageInput user={user} />
    </div>
  );
};

export default MessageSection;
