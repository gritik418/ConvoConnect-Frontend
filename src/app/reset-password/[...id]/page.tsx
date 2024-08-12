"use client";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { useState } from "react";
import styles from "./ResetPassword.module.css";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  resetPasswordAsync,
  selectResetPasswordErrors,
  selectResetPasswordLoading,
} from "@/features/auth/authSlice";

const ResetPassword = ({ params }: { params: { id: string[] } }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const loading: boolean = useSelector(selectResetPasswordLoading);
  const errors = useSelector(selectResetPasswordErrors);

  const handleResetPassword = () => {
    dispatch(
      resetPasswordAsync({
        confirm_new_password: confirmNewPassword,
        new_password: newPassword,
        secretToken: params.id[1],
        userId: params.id[0],
      })
    );
  };

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
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  id="new_password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              {errors.new_password && (
                <span className="text-red-400 text-sm">
                  {errors.new_password}
                </span>
              )}
            </div>

            <div className="mb-8">
              <label
                htmlFor="confirm_new_password"
                className="text-gray-600 text-lg mb-1"
              >
                Enter Confirm New Password
              </label>
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  id="confirm_new_password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              {errors.confirm_new_password && (
                <span className="text-red-400 text-sm">
                  {errors.confirm_new_password}
                </span>
              )}
            </div>

            <button
              onClick={handleResetPassword}
              className="bg-[#095699] mt-3 transition-all duration-300 hover:bg-[#1071c6] text-xl py-2 rounded-md text-white"
            >
              {loading ? "Processing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
