"use client";
import GroupAdmins from "@/components/GroupAdmins/GroupAdmins";
import GroupMembers from "@/components/GroupMembers/GroupMembers";
import Navbar from "@/components/Navbar/Navbar";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";
import {
  getChatByIdAsync,
  selectSelectedChat,
  selectUpdateGroupLoading,
  updateGroupInfoAsync,
} from "@/features/chat/chatSlice";
import { Avatar } from "@chakra-ui/react";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const GroupInfo = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const chat: ChatType = useSelector(selectSelectedChat);
  const [adminIds, setAdminIds] = useState<string[]>([]);
  const [groupIcon, setGroupIcon] = useState<any>();
  const loading = useSelector(selectUpdateGroupLoading);
  const [groupIconPreview, setGroupIconPreview] = useState<any>();
  const { theme } = useCustomTheme();

  const [groupInfo, setGroupInfo] = useState<{
    group_name: string;
    group_description: string;
  }>({ group_name: "", group_description: "" });

  const handleChangeGroupIcon = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length! > 0) {
      var file = e.target?.files![0];
      setGroupIcon(e.target?.files![0]);
      const objectUrl = URL.createObjectURL(file);
      setGroupIconPreview(objectUrl);
    }
  };

  const handleUpdate = () => {
    dispatch(
      updateGroupInfoAsync({
        chatId: chat._id.toString(),
        group_description: groupInfo.group_description || "",
        group_name: groupInfo.group_name || "",
        group_icon: groupIcon,
      })
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGroupInfo({ ...groupInfo, [name]: value });
  };

  useEffect(() => {
    dispatch(getChatByIdAsync(params.id));
  }, []);

  useEffect(() => {
    if (!chat) return;
    if (chat?.admins) {
      const ids = chat?.admins?.map((admin: ChatAdminType) => {
        return admin._id.toString();
      });
      setAdminIds(ids);
    }

    setGroupInfo({
      group_description: chat.group_description || "",
      group_name: chat.group_name || "",
    });

    setGroupIconPreview(chat.group_icon || "");
  }, [chat]);

  return (
    <div className={`pb-[10px] ${theme === "dark" ? "bg-[#100d1c]" : ""}`}>
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
          src={groupIconPreview || ""}
        >
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute bottom-5 right-5 h-[60px] w-[60px] bg-[#095699] grid place-items-center rounded-full"
          >
            <FaCamera className="text-white text-2xl" />
          </label>
          <input
            type="file"
            onChange={handleChangeGroupIcon}
            id="avatar"
            className="hidden"
          />
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
          src={groupIconPreview || ""}
        >
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute bottom-2 right-2 h-[50px] w-[50px] bg-[#095699] grid place-items-center rounded-full"
          >
            <FaCamera className="text-white text-2xl" />
          </label>
          <input
            type="file"
            onChange={handleChangeGroupIcon}
            id="avatar"
            className="hidden"
          />
        </Avatar>
      </div>

      <div className="container min-h-[40vh] mb-6 mx-auto p-4">
        <div
          className={`rounded-lg p-4 flex flex-col ${
            theme === "dark" ? "bg-[#2d2b41]" : "bg-slate-100"
          }`}
        >
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="group_name"
              className={`text-lg p-1 ${
                theme === "dark" ? "text-white" : "text-gray-500"
              }`}
            >
              Group Name
            </label>
            <input
              id="group_name"
              name="group_name"
              value={groupInfo.group_name}
              onChange={handleChange}
              type="text"
              placeholder="Group Name"
              className="border-2 p-2 rounded-md outline-[#095699]"
            />
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col w-[100%] mb-6">
              <label
                htmlFor="group_description"
                className={`text-lg  p-1 ${
                  theme === "dark" ? "text-white" : "text-gray-500"
                }`}
              >
                Group Description
              </label>
              <textarea
                id="group_description"
                name="group_description"
                value={groupInfo.group_description}
                onChange={handleChange}
                placeholder="Group Description"
                className="border-2 p-2 min-h-[200px] rounded-md outline-[#095699]"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="bg-[#095699] text-white px-8 py-2 rounded-md text-2xl self-end mt-5"
          >
            {loading ? "Processing..." : "Update"}
          </button>
        </div>
      </div>

      <GroupMembers members={chat.members} adminIds={adminIds} />

      <GroupAdmins admins={chat.admins} />
    </div>
  );
};

export default GroupInfo;
