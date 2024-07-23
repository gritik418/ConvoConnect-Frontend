"use client";
import GetUser from "@/components/GetUser/GetUser";
import Navbar from "@/components/Navbar/Navbar";
import { selectUser } from "@/features/user/userSlice";
import { Avatar } from "@chakra-ui/react";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { IoImages } from "react-icons/io5";

type UserType = {
  id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const Profile = () => {
  const user: UserType = useSelector(selectUser);

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  const handleChangeBackground = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <GetUser>
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
          <label
            htmlFor="background"
            className="cursor-pointer absolute bottom-6 right-6 h-[40px] w-[50px] rounded-lg grid place-items-center bg-white"
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
          className="h-[300px] w-[300px] absolute bottom-0 translate-y-[-50%] left-20"
          name={`${user.first_name} ${user.last_name}`}
          src={
            user.avatar ||
            "https://convo-connect-backend.onrender.com/images/avatar.jpeg"
          }
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
            src={"/images/profile-bg.jpg"}
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
          name={`${user.first_name} ${user.last_name}`}
          src={
            user.avatar ||
            "https://convo-connect-backend.onrender.com/images/avatar.jpeg"
          }
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
              <label htmlFor="" className="text-lg text-gray-500 p-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="border-2 p-2 rounded-md outline-[#095699]"
              />
            </div>

            <div className="flex flex-col w-[45%]">
              <label htmlFor="" className="text-lg text-gray-500 p-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="border-2 p-2 rounded-md outline-[#095699]"
              />
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="flex flex-col w-[45%]">
              <label htmlFor="" className="text-lg text-gray-500 p-1">
                Email
              </label>
              <input
                readOnly
                type="text"
                placeholder="Email"
                className="border-2 p-2 rounded-md outline-none"
              />
            </div>

            <div className="flex flex-col w-[45%]">
              <label htmlFor="" className="text-lg text-gray-500 p-1">
                Username
              </label>
              <input
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
                placeholder="Email"
                className="border-2 p-2 min-h-[200px] rounded-md outline-[#095699]"
              />
            </div>
          </div>

          <button className="bg-[#095699] text-white px-6 py-2 rounded-md text-2xl self-end mt-5">
            Update
          </button>
        </div>
      </div>

      <div className="container min-h-[40vh] mb-[100px] mx-auto block sm:hidden">
        <div className="bg-slate-100 rounded-lg p-4 flex flex-col mx-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-lg text-gray-500 p-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="border-2 p-2 rounded-md outline-[#095699]"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-lg text-gray-500 p-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="border-2 p-2 rounded-md outline-[#095699]"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-lg text-gray-500 p-1">
              Email
            </label>
            <input
              readOnly
              type="text"
              placeholder="Email"
              className="border-2 p-2 rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-lg text-gray-500 p-1">
              Username
            </label>
            <input
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
              placeholder="Email"
              className="border-2 p-2 min-h-[200px] rounded-md outline-[#095699]"
            />
          </div>

          <button className="bg-[#095699] mt-8 text-white px-6 py-2 rounded-md text-2xl self-end">
            Update
          </button>
        </div>
      </div>
    </GetUser>
  );
};

export default Profile;
