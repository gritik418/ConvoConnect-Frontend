import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import React from "react";
import styles from "./ResetPassword.module.css";
import { Input } from "@chakra-ui/react";

const ResetPassword = ({ params }: { params: { id: string[] } }) => {
  console.log(params.id);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className="flex flex-col sm:flex-row min-h-[600px] p-3 bg-white w-[90%] rounded-md">
          <div className="flex bg-white w-full p-4 sm:p-14">
            <Image
              src={"/images/reset-password.jpg"}
              className="w-full"
              height={500}
              width={500}
              alt="img"
            />
          </div>

          <div className="flex flex-col w-full p-3 justify-center min-h-[400px]">
            <h1 className="text-3xl mb-8">Reset Your Password</h1>
            <div className="mb-4">
              <label
                htmlFor="new_password"
                className="text-gray-600 text-lg mb-1"
              >
                Enter New Password
              </label>
              <Input placeholder="New Password" id="new_password" />
            </div>

            <div className="mb-8">
              <label
                htmlFor="confirm_new_password"
                className="text-gray-600 text-lg mb-1"
              >
                Enter Confirm New Password
              </label>
              <Input
                placeholder="Confirm New Password"
                id="confirm_new_password"
              />
            </div>

            <button className="bg-[#095699] mt-3 transition-all duration-300 hover:bg-[#1071c6] text-xl py-2 rounded-md text-white">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
