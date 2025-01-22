"use client";
import {
  selectIsLoggedIn,
  selectVerifyMessage,
  verifyUserEmailAsync,
} from "@/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Verify = ({ params }: { params: { slug: string[] } }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const verifyMessage: string = useSelector(selectVerifyMessage);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    dispatch(
      verifyUserEmailAsync({ id: params.slug[0], secretToken: params.slug[1] })
    );
  }, [dispatch, params.slug]);

  if (isLoggedIn) {
    return router.push("/");
  }

  return (
    <>
      <div className="bg-[#ffbbbb] h-[70px] flex items-center pl-[60px]">
        <h1 className="text-3xl font-bold">ConvoConnect</h1>
      </div>
      <div className="flex flex-col items-center h-[100vh] py-[90px] px-4 lg:px-5">
        <h2 className="text-4xl mb-10 font-bold tracking-wider text-center">
          Verifying your Email Address
        </h2>
        <p className="text-xl text-center mb-5 p-5">
          Thanks for creating your account on{" "}
          <span className="text-[#fca7a7] font-bold text-2xl">
            ConvoConnect!
          </span>{" "}
          You will be redirected soon after verification.
        </p>
        <p className="text-lg text-center">
          {" "}
          This process might take few seconds.
        </p>

        {verifyMessage ? (
          <p className="mt-10 text-xl">{verifyMessage}</p>
        ) : (
          <Image
            className="mt-10"
            src={"/images/loading.gif"}
            alt="loading"
            height={120}
            width={120}
          />
        )}
      </div>
    </>
  );
};

export default Verify;
