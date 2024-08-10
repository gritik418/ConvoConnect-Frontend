"use client";
import React from "react";
import styles from "./ForgotPassword.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import Link from "next/link";

const ForgotPassword = () => {
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

            <div className="text-center my-[40px] flex items-center justify-evenly">
              <span className="h-[2px] bg-gray-200 w-[40%]"></span>
              OR
              <span className="h-[2px] bg-gray-200 w-[40%]"></span>
            </div>
            <div className="flex items-center justify-center">
              <Link
                className="bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-md w-fit py-1 px-3"
                href={"/login"}
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
