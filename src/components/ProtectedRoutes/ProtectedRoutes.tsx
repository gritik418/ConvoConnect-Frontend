"use client";
import { selectAuthFailed } from "@/features/auth/authSlice";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const authFailed = useSelector(selectAuthFailed);

  if (authFailed) {
    return redirect("/login");
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
