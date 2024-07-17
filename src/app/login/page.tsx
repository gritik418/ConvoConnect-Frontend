"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { IoIosLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [show, setShow] = useState<boolean>(false);

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
              autoComplete="off"
              placeholder="Email or username"
            />
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.forgot}>
            <label htmlFor="password" className={styles.label}>
              Enter Password
            </label>
          </div>

          <div className={styles.inputGroup}>
            <IoIosLock className="text-3xl" />
            <input
              type={show ? "text" : "password"}
              className={styles.input}
              id="password"
              autoComplete="off"
              placeholder="Password"
            />
            <div className={styles.toggleBtn} onClick={toggleShow}>
              {show ? "Hide" : "Show"}
            </div>
          </div>
          <Link href={"/"} className="ml-auto">
            {" "}
            Forgot Password?
          </Link>

          <div className={styles.btn}>
            {"loading" ? "Processing..." : "Login"}
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
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
