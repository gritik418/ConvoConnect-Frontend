"use client";
import GroupMembers from "@/components/GroupMembers/GroupMembers";
import Navbar from "@/components/Navbar/Navbar";
import {
  getChatByIdAsync,
  selectSelectedChat,
} from "@/features/chat/chatSlice";
import { Avatar } from "@chakra-ui/react";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const GroupInfo = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const chat: ChatType = useSelector(selectSelectedChat);

  useEffect(() => {
    dispatch(getChatByIdAsync(params.id));
  }, []);
  return (
    <>
      <Navbar />
      <div className="relative hidden sm:block">
        <div className="relative">
          <Image
            className="w-full h-[250px]"
            height={400}
            width={600}
            alt="bg"
            src={"/images/profile-bg.jpg"}
          />
        </div>

        <Avatar
          height={"300px"}
          width={"300px"}
          className="h-[300px] w-[300px] absolute bottom-0 translate-y-[-50%] -translate-x-[50%] left-[50%]"
          src={chat.group_icon || ""}
        >
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute bottom-5 right-5 h-[60px] w-[60px] bg-[#095699] grid place-items-center rounded-full"
          >
            <FaCamera className="text-white text-2xl" />
          </label>
          <input type="file" id="avatar" className="hidden" />
        </Avatar>
      </div>

      <div className="relative block sm:hidden">
        <div className="relative">
          <Image
            className="w-full h-[160px]"
            height={400}
            width={600}
            alt="bg"
            src={"/images/profile-bg.jpg"}
          />
        </div>

        <Avatar
          height={"180px"}
          width={"180px"}
          className="h-[180px] w-[180px] absolute bottom-[50%] translate-y-[-50%] -translate-x-[50%] left-[50%]"
          src={chat.group_icon || ""}
        >
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute bottom-2 right-2 h-[50px] w-[50px] bg-[#095699] grid place-items-center rounded-full"
          >
            <FaCamera className="text-white text-2xl" />
          </label>
          <input type="file" id="avatar" className="hidden" />
        </Avatar>
      </div>

      <div className="container min-h-[40vh] mb-6 mx-auto p-4">
        <div className="bg-slate-100 rounded-lg p-4 flex flex-col">
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="group_name" className="text-lg text-gray-500 p-1">
              Group Name
            </label>
            <input
              id="group_name"
              name="group_name"
              type="text"
              placeholder="Group Name"
              className="border-2 p-2 rounded-md outline-[#095699]"
            />
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col w-[100%] mb-6">
              <label
                htmlFor="group_description"
                className="text-lg text-gray-500 p-1"
              >
                Group Description
              </label>
              <textarea
                id="group_description"
                name="group_description"
                placeholder="Group Description"
                className="border-2 p-2 min-h-[200px] rounded-md outline-[#095699]"
              />
            </div>
          </div>

          <button className="bg-[#095699] text-white px-8 py-2 rounded-md text-2xl self-end mt-5">
            {"loading" ? "Processing..." : "Update"}
          </button>
        </div>
      </div>

      <GroupMembers members={chat.members} />
    </>
  );
};

export default GroupInfo;
