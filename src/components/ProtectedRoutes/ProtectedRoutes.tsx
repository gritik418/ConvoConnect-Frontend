"use client";
import { selectCookie } from "@/features/auth/authSlice";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const cookie = useSelector(selectCookie);

  if (!cookie) return redirect("/login");
  return <>{children}</>;
};

export default ProtectedRoutes;
