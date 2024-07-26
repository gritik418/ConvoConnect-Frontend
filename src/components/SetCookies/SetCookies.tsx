"use client";
import React from "react";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCookie } from "@/features/auth/authSlice";

const SetCookies = ({
  cookie,
}: {
  cookie:
    | {
        name: string;
        value: string;
      }
    | undefined;
}) => {
  const dispatch = useDispatch();

  if (cookie?.value) {
    const user: any = jwt.decode(cookie?.value);
    if (user?.id) {
      dispatch(setCookie(cookie.value));
    }
  }

  return <></>;
};

export default SetCookies;
