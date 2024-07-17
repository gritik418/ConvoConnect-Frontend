"use client";
import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { IoIosLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Create a new account</h1>

        <div className={styles.group}>
          <label htmlFor="firstName" className={styles.label}>
            Enter your first name
          </label>
          <div className={styles.inputGroup}>
            <FaUser />
            <input
              type="text"
              className={styles.input}
              id="firstName"
              autoComplete="off"
              placeholder="First Name"
            />
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="lastName" className={styles.label}>
            Enter your last name
          </label>
          <div className={styles.inputGroup}>
            <FaUser />
            <input
              type="text"
              className={styles.input}
              id="lastName"
              autoComplete="off"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="username" className={styles.label}>
            Enter your username
          </label>
          <div className={styles.inputGroup}>
            <FaUser />
            <input
              type="text"
              className={styles.input}
              id="username"
              autoComplete="off"
              placeholder="Username"
            />
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="email" className={styles.label}>
            Enter your email
          </label>
          <div className={styles.inputGroup}>
            <MdEmail className={styles.icon} />
            <input
              type="email"
              className={styles.input}
              id="email"
              autoComplete="off"
              placeholder="Email"
            />
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="password" className={styles.label}>
            Enter your password
          </label>

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
        </div>

        <div className={styles.group}>
          <label htmlFor="password" className={styles.label}>
            Enter confirm password
          </label>

          <div className={styles.inputGroup}>
            <IoIosLock className="text-3xl" />
            <input
              type={show ? "text" : "password"}
              className={styles.input}
              id="password"
              autoComplete="off"
              placeholder="Confirm Password"
            />
            <div className={styles.toggleBtn} onClick={toggleShow}>
              {show ? "Hide" : "Show"}
            </div>
          </div>
        </div>

        <div className={styles.btn}>Continue</div>
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
          Already have an account?{" "}
          <Link className={styles.link} href={"/login"}>
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
