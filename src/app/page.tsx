"use client";
import Layout from "@/components/Layout/Layout";
import Navbar from "@/components/Navbar/Navbar";
import { getUserAsync } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return (
    <>
      <Navbar />
      <Layout />
    </>
  );
};

export default Home;
