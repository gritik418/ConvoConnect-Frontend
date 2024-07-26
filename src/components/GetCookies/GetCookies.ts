"use server";
import { CC_TOKEN } from "@/constants/variables";
import { cookies } from "next/headers";

const GetCookies = () => {
  const cookie: { name: string; value: string } | undefined =
    cookies().get(CC_TOKEN);

  return cookie;
};

export default GetCookies;
