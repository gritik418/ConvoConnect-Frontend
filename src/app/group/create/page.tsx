"use client";
import GroupMemberSelectItem from "@/components/GroupMemberSelectItem/GroupMemberSelectItem";
import GroupMemberSkeleton from "@/components/GroupMemberSkeleton/GroupMemberSkeleton";
import Navbar from "@/components/Navbar/Navbar";
import {
  getFriendsAsync,
  selectFriends,
  selectFriendsLoading,
} from "@/features/friend/friendSlice";
import { Avatar } from "@chakra-ui/react";
import { Dispatch } from "@reduxjs/toolkit";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  createGroupChatAsync,
  selectCreateGroupErrors,
  selectCreateGroupLoading,
} from "@/features/chat/chatSlice";
import ProtectedRoutes from "@/components/ProtectedRoutes/ProtectedRoutes";

export type SelectMemberType = {
  avatar?: string;
  _id: string;
  first_name: string;
  last_name?: string;
  email: string;
  username: string;
};

const CreateGroup = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const members: SelectMemberType[] = useSelector(selectFriends);
  const loading: boolean = useSelector(selectFriendsLoading);

  const [preview, setPreview] = useState<string>();
  const [groupIcon, setGroupIcon] = useState<any>();
  const errors = useSelector(selectCreateGroupErrors);
  const createLoading = useSelector(selectCreateGroupLoading);
  const [memberError, setMemberError] = useState<string>("");

  const [data, setData] = useState<{
    group_name: "";
    group_description: "";
  }>({ group_name: "", group_description: "" });

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleChangeGroupIcon = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length! > 0) {
      var file = e.target?.files![0];
      setGroupIcon(e.target?.files![0]);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleCreateGroup = async () => {
    setMemberError("");
    if (selectedMembers.length < 2) {
      setMemberError("Atleast two members are required.");
      return;
    }
    dispatch(
      createGroupChatAsync({
        group_name: data?.group_name || "",
        group_description: data?.group_description,
        group_icon: groupIcon,
        members: selectedMembers,
      })
    );
    setData({ group_description: "", group_name: "" });
    setGroupIcon(null);
    setSelectedMembers([]);
    setPreview("");
    dispatch(getFriendsAsync());
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    dispatch(getFriendsAsync());
  }, []);
  return (
    <ProtectedRoutes>
      <Navbar />
      <div className="container mx-auto py-[60px] flex flex-col px-6 xl:px-0">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Create Group
        </h1>
        <div className="flex-col md:flex-row flex justify-between items-center">
          <div className="flex w-full mb-14 md:mb-0 md:w-[50%] items-center justify-center">
            <Avatar
              height={"250px"}
              width={"250px"}
              className="h-[250px] w-[250px] md:h-[300px] md:w-[300px]"
              name=""
              src={preview || ""}
            >
              <label
                htmlFor="avatar"
                className="cursor-pointer absolute bottom-2 right-2 h-[60px] w-[60px] bg-[#095699] grid place-items-center rounded-full"
              >
                <FaCamera className="text-white text-2xl" />
              </label>
              <input
                onChange={handleChangeGroupIcon}
                type="file"
                id="avatar"
                className="hidden"
              />
            </Avatar>
          </div>

          <div className="flex w-full md:w-[50%]">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full mb-6">
                <label
                  htmlFor="groupName"
                  className="text-lg text-gray-500 p-1"
                >
                  Group Name
                </label>
                <input
                  id="groupName"
                  value={data.group_name}
                  onChange={handleChange}
                  name="group_name"
                  type="text"
                  placeholder="Group Name"
                  className="border-2 p-2 rounded-md outline-none"
                />
                {errors.group_name && (
                  <span className="text-red-500">{errors.group_name}</span>
                )}
              </div>

              <div className="flex flex-col w-full mb-6">
                <label
                  htmlFor="groupDescription"
                  className="text-lg text-gray-500 p-1"
                >
                  Group Description
                </label>
                <textarea
                  id="groupDescription"
                  name="group_description"
                  value={data.group_description}
                  onChange={handleChange}
                  placeholder="Group Description"
                  className="border-2 p-2 rounded-md outline-none min-h-[120px]"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl mt-14 mb-2">Select Group Members</h2>
        <div className="flex flex-col overflow-y-scroll gap-3 border-2 rounded-md p-4 h-[400px]">
          {loading ? (
            <>
              <GroupMemberSkeleton />
              <GroupMemberSkeleton />
              <GroupMemberSkeleton />
              <GroupMemberSkeleton />
            </>
          ) : (
            <>
              {members.map((member: SelectMemberType) => (
                <GroupMemberSelectItem
                  selectedMembers={selectedMembers}
                  setSelectedMembers={setSelectedMembers}
                  setMemberError={setMemberError}
                  key={member._id}
                  member={member}
                />
              ))}
            </>
          )}
        </div>
        {(errors.members || memberError) && (
          <span className="text-red-500">{memberError || errors.members}</span>
        )}

        <button
          onClick={handleCreateGroup}
          className="mt-10 flex items-center justify-center gap-2 bg-[#095699] text-2xl text-white px-4 py-1 rounded-lg self-end"
        >
          <AiOutlineUsergroupAdd className="text-2xl font-bold" />
          {createLoading ? "Processing...." : "Create"}
        </button>
      </div>
    </ProtectedRoutes>
  );
};

export default CreateGroup;
