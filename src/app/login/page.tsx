"use client";
import {
  selectIsLoggedIn,
  selectLoginLoading,
  userLoginAsync,
} from "@/features/auth/authSlice";
import loginSchema from "@/validators/loginValidator";
import { Dispatch } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.css";

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const loading: boolean = useSelector(selectLoginLoading);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const router = useRouter();

  const toggleShow = () => {
    setShow(!show);
  };

  const handleGoogleLogin = () => {
    return router.push(`${process.env.NEXT_PUBLIC_SOCKET}/auth/google`);
  };

  const { errors, submitForm, values, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userLoginAsync(values));
    },
    validationSchema: loginSchema,
  });

  if (isLoggedIn) {
    return router.push("/");
  }

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
              autoComplete="off"
              placeholder="Email or username"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <span className="text-xs text-red-400">
            {errors.email &&
              `${errors.email.at(0)?.toUpperCase()}${errors.email.slice(1)}`}
          </span>
        </div>

        <div className={styles.group}>
          <div className={styles.forgot}>
            <label htmlFor="password" className={styles.label}>
              Enter Password
            </label>

            <Link
              href={"/forgot-password"}
              className="ml-auto text-xs font-bold"
            >
              {" "}
              Forgot Password?
            </Link>
          </div>

          <div className={styles.inputGroup}>
            <IoIosLock className="text-3xl" />
            <input
              type={show ? "text" : "password"}
              className={styles.input}
              id="password"
              autoComplete="off"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            <div className={styles.toggleBtn} onClick={toggleShow}>
              {show ? "Hide" : "Show"}
            </div>
          </div>
          <span className="text-xs text-red-400">
            {errors.password &&
              `${errors.password.at(0)?.toUpperCase()}${errors.password.slice(
                1
              )}`}
          </span>

          <button className={styles.btn} onClick={submitForm}>
            {loading ? "Processing..." : "Login"}
          </button>
          <div className={styles.divider}> OR</div>

          <div className={styles.iconButton} onClick={handleGoogleLogin}>
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
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
