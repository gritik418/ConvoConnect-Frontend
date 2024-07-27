"use client";
import { Avatar, ToastId } from "@chakra-ui/react";
import React from "react";
import { IoClose } from "react-icons/io5";

const Notification = ({
  close,
  toastId,
  content,
  sender,
}: {
  close: (id: number) => void;
  toastId: ToastId | undefined;
  content: string;
  sender: MessageSenderType;
}) => {
  return (
    <div className="gap-2 bg-slate-600 p-2 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Avatar
            name={`${sender.first_name} ${sender.last_name}`}
            src={sender.avatar || ""}
          />
          <div className="">
            <p className="text-white font-bold">
              {sender.first_name} {sender.last_name}
            </p>
            <p className="text-white">{sender.username}</p>
          </div>
        </div>
        <div
          onClick={() => close(toastId as number)}
          className="cursor-pointer grid h-[25px] w-[25px] bg-white rounded-lg place-items-center"
        >
          <IoClose className="text-xl" />
        </div>
      </div>
      <div className="text-sm w-full min-h-8 text-white mt-2 break-words">
        {content.length > 50 ? `${content.slice(0, 50) + "..."}` : content}
      </div>
    </div>
  );
};

export default Notification;
