"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { IoIosLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import loginSchema from "@/validators/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectLoginLoading,
  userLoginAsync,
} from "@/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const loading: boolean = useSelector(selectLoginLoading);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  if (isLoggedIn) redirect("/");

  const dispatch = useDispatch<Dispatch<any>>();

  const { values, handleChange, errors, submitForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userLoginAsync(values));
    },
    validationSchema: loginSchema,
  });

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Login</h1>

        <div className={styles.group}>
          <label htmlFor="email" className={styles.label}>
            Enter Email or Username
          </label>
          <div className={styles.inputGroup}>
            <FaUser />
            <input
              type="text"
              className={styles.input}
              id="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Email or username"
            />
          </div>
          {errors.email && (
            <span className="text-red-400">
              {errors.email
                ?.at(0)
                ?.toUpperCase()
                .concat(errors.email?.slice(1))}
            </span>
          )}
        </div>

        <div className={styles.group}>
          <div className={styles.forgot}>
            <label htmlFor="password" className={styles.label}>
              Enter Password
            </label>
            <Link href={"/"}> Forgot Password?</Link>
          </div>

          <div className={styles.inputGroup}>
            <IoIosLock className="text-3xl" />
            <input
              type={show ? "text" : "password"}
              className={styles.input}
              id="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Password"
            />
            <div className={styles.toggleBtn} onClick={toggleShow}>
              {show ? "Hide" : "Show"}
            </div>
          </div>

          {errors.password && (
            <span className="text-red-400">
              {errors.password
                ?.at(0)
                ?.toUpperCase()
                .concat(errors.password?.slice(1))}
            </span>
          )}

          <div className={styles.btn} onClick={submitForm}>
            {loading ? "Processing..." : "Login"}
          </div>
          <div className={styles.divider}> OR</div>

          <div className={styles.iconButton}>
            <Image
              src={"/images/google.jpg"}
              alt="google"
              height={50}
              width={50}
            />
            Google
          </div>

          <p className={styles.option}>
            Don&apos;t have an account?{" "}
            <Link className={styles.link} href={"/signup"}>
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
