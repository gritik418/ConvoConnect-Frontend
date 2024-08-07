"use client";
import React from "react";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import {
  removeCookie,
  setAuthFailed,
  setCookie,
} from "@/features/auth/authSlice";

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
    } else {
      dispatch(removeCookie());
    }
  } else {
    dispatch(removeCookie());
  }

  return <></>;
};

export default SetCookies;
