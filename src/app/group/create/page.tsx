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
  const [data, setData] = useState<{
    group_name: "";
    group_description: "";
  }>();

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleChangeGroupIcon = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length! > 0) {
      var file = e.target?.files![0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleCreateGroup = () => {
    console.log(selectedMembers);
  };

  useEffect(() => {
    dispatch(getFriendsAsync());
  }, []);
  return (
    <>
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
              name={"Ritik Gupta"}
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
                  name="groupName"
                  type="text"
                  placeholder="Group Name"
                  className="border-2 p-2 rounded-md outline-none"
                />
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
                  name="groupDescription"
                  placeholder="Group Description"
                  className="border-2 p-2 rounded-md outline-none min-h-[120px]"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl mt-14 mb-2">Select Group Members</h2>
        <div className="mb-8 flex flex-col overflow-y-scroll gap-3 border-2 rounded-md p-4 h-[400px]">
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
                  key={member._id}
                  member={member}
                />
              ))}
            </>
          )}
        </div>

        <button
          onClick={handleCreateGroup}
          className="flex items-center justify-center gap-2 bg-[#095699] text-2xl text-white px-4 py-1 rounded-lg self-end"
        >
          <AiOutlineUsergroupAdd className="text-2xl font-bold" />
          Create
        </button>
      </div>
    </>
  );
};

export default CreateGroup;
