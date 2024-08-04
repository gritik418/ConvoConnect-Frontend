"use client";
import Navbar from "@/components/Navbar/Navbar";
import {
  selectUpdateUserLoading,
  selectUser,
  updateUserAsync,
} from "@/features/user/userSlice";
import { Avatar } from "@chakra-ui/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import { Dispatch } from "@reduxjs/toolkit";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
  email: string;
  bio?: string;
};

const Profile = () => {
  const user: UserType = useSelector(selectUser);
  const [avatarPreview, setAvatarPreview] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [background, setBackground] = useState<any>();
  const [backgroundPreview, setBackgroundPreview] = useState<any>();

  const [userData, setUserData] = useState<{
    first_name: string;
    last_name?: string;
    avatar?: string;
    username: string;
    email: string;
    bio?: string;
  }>({ ...user });
  const dispatch = useDispatch<Dispatch<any>>();

  const loading: boolean = useSelector(selectUpdateUserLoading);

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length! > 0) {
      var file = e.target?.files![0];
      setAvatar(e.target?.files![0]);
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const handleChangeBackground = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length! > 0) {
      var file = e.target?.files![0];
      setBackground(e.target?.files![0]);
      const objectUrl = URL.createObjectURL(file);
      setBackgroundPreview(objectUrl);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = () => {
    dispatch(
      updateUserAsync({
        first_name: userData.first_name,
        last_name: userData.last_name,
        bio: userData.bio,
        avatar,
        background,
      })
    );
  };

  useEffect(() => {
    setUserData({ ...user });
    setAvatarPreview(user?.avatar || "");
  }, [user]);

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
            src={backgroundPreview || "/images/profile-bg.jpg"}
          />
          <label
            htmlFor="background"
            className="cursor-pointer absolute bottom-6 right-16 lg:right-28 h-[40px] w-[50px] rounded-lg grid place-items-center bg-white"
          >
            <IoImages className="text-[#095699] text-2xl" />
          </label>{" "}
          <input
            onChange={handleChangeBackground}
            type="file"
            id="background"
            className="hidden"
          />
        </div>

        <Avatar
          height={"300px"}
          width={"300px"}
          className="h-[300px] w-[300px] absolute bottom-0 translate-y-[-50%] left-16 lg:left-28 "
          name={`${user?.first_name} ${user?.last_name}`}
          src={avatarPreview || ""}
        >
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute bottom-5 right-5 h-[60px] w-[60px] bg-[#095699] grid place-items-center rounded-full"
          >
            <FaCamera className="text-white text-2xl" />
          </label>
          <input
            onChange={handleChangeAvatar}
            type="file"
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
            src={backgroundPreview || "/images/profile-bg.jpg"}
          />
          <label
            htmlFor="background"
            className="cursor-pointer absolute bottom-2 right-4 h-[30px] w-[40px] rounded-lg grid place-items-center bg-white"
          >
            <IoImages className="text-[#095699] text-xl" />
          </label>{" "}
          <input
            onChange={handleChangeBackground}
            type="file"
            id="background"
            className="hidden"
          />
        </div>

        <Avatar
          height={"180px"}
          width={"180px"}
          className="h-[180px] w-[180px] absolute bottom-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%]"
          name={`${user?.first_name} ${user?.last_name}`}
          src={avatarPreview || ""}
        >
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute bottom-2 right-2 h-[50px] w-[50px] bg-[#095699] grid place-items-center rounded-full"
          >
            <FaCamera className="text-white text-2xl" />
          </label>
          <input
            onChange={handleChangeAvatar}
            type="file"
            id="avatar"
            className="hidden"
          />
        </Avatar>
      </div>

      <div className="container min-h-[40vh] mb-[100px] mx-auto hidden sm:block">
        <div className="bg-slate-100 rounded-lg p-4 flex flex-col">
          <div className="flex justify-between mb-6">
            <div className="flex flex-col w-[45%]">
              <label htmlFor="first_name" className="text-lg text-gray-500 p-1">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                type="text"
                placeholder="First Name"
                className="border-2 p-2 rounded-md outline-[#095699]"
              />
            </div>

            <div className="flex flex-col w-[45%]">
              <label htmlFor="last_name" className="text-lg text-gray-500 p-1">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
                className="border-2 p-2 rounded-md outline-[#095699]"
              />
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="flex flex-col w-[45%]">
              <label htmlFor="email" className="text-lg text-gray-500 p-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                readOnly
                type="text"
                placeholder="Email"
                className="border-2 p-2 rounded-md outline-none"
              />
            </div>

            <div className="flex flex-col w-[45%]">
              <label htmlFor="username" className="text-lg text-gray-500 p-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                type="text"
                readOnly
                placeholder="Username"
                className="border-2 p-2 rounded-md outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="flex flex-col w-[100%]">
              <label htmlFor="bio" className="text-lg text-gray-500 p-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                placeholder="Bio"
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

      <div className="container min-h-[40vh] mb-[100px] mx-auto block sm:hidden">
        <div className="bg-slate-100 rounded-lg p-4 flex flex-col mx-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="first_name" className="text-lg text-gray-500 p-1">
              First Name
            </label>
            <input
              name="first_name"
              id="first_name"
              value={userData.first_name}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              className="border-2 p-2 rounded-md outline-[#095699]"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="last_name" className="text-lg text-gray-500 p-1">
              Last Name
            </label>
            <input
              name="last_name"
              id="last_name"
              value={userData.last_name}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              className="border-2 p-2 rounded-md outline-[#095699]"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-lg text-gray-500 p-1">
              Email
            </label>
            <input
              name="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              readOnly
              type="text"
              placeholder="Email"
              className="border-2 p-2 rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="text-lg text-gray-500 p-1">
              Username
            </label>
            <input
              name="username"
              id="username"
              value={userData.username}
              onChange={handleChange}
              readOnly
              type="text"
              placeholder="Username"
              className="border-2 p-2 rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col w-[100%]">
            <label htmlFor="bio" className="text-lg text-gray-500 p-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="border-2 p-2 min-h-[200px] rounded-md outline-[#095699]"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-[#095699] mt-8 text-white px-8 py-2 rounded-md text-2xl self-end"
          >
            {loading ? "Processing..." : "Update"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
