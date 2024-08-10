import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import React from "react";
import styles from "./ChangePassword.module.css";
import { Input } from "@chakra-ui/react";

const ChangePassword = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className="flex flex-col sm:flex-row min-h-[600px] p-3 bg-white w-[90%] rounded-md">
          <div className="flex bg-white w-full">
            <Image
              src={"/images/forgot-password.jpg"}
              className="w-full"
              height={500}
              width={500}
              alt="img"
            />
          </div>

          <div className="flex flex-col w-full p-3 justify-center min-h-[400px]">
            <h1 className="text-3xl mb-8">Forgot Your Password?</h1>
            <label htmlFor="email" className="text-gray-600 text-lg mb-1">
              Enter your Email
            </label>
            <Input placeholder="Email" id="email" />

            <button className="bg-[#095699] mt-3 transition-all duration-300 hover:bg-[#1071c6] text-xl py-2 rounded-md text-white">
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
