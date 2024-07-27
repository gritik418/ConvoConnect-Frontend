"use client";
import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import { IoIosLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  selectCookie,
  selectSignupLoading,
  selectUserEmail,
  userSignupAsync,
} from "@/features/auth/authSlice";
import signupSchema from "@/validators/signupValidator";
import EmailSent from "@/components/EmailSent/EmailSent";
import { redirect, useRouter } from "next/navigation";

const SignUp = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const email: string = useSelector(selectUserEmail);
  const loading: boolean = useSelector(selectSignupLoading);
  const dispatch = useDispatch<Dispatch<any>>();
  const cookie = useSelector(selectCookie);
  const router = useRouter();

  const toggleShow = () => {
    setShow(!show);
  };

  const { errors, submitForm, values, handleChange } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: (values) => {
      dispatch(userSignupAsync(values));
    },
    validationSchema: signupSchema,
  });

  const handleGoogleLogin = () => {
    return router.push(`${process.env.NEXT_PUBLIC_SOCKET}/auth/google`);
  };

  useEffect(() => {
    if (email) {
      setShowModal(true);
    }
  }, [email]);

  if (cookie) {
    return redirect("/");
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Create a new account</h1>

          <div className={styles.group}>
            <label htmlFor="first_name" className={styles.label}>
              Enter First Name
            </label>
            <div className={styles.inputGroup}>
              <FaUser />
              <input
                type="text"
                className={styles.input}
                id="first_name"
                autoComplete="off"
                placeholder="First Name"
                value={values.first_name}
                onChange={handleChange}
              />
            </div>

            <span className="text-xs text-red-400">
              {errors.first_name &&
                `${errors.first_name
                  .at(0)
                  ?.toUpperCase()}${errors.first_name.slice(1)}`}
            </span>
          </div>

          <div className={styles.group}>
            <label htmlFor="last_name" className={styles.label}>
              Enter Last Name
            </label>
            <div className={styles.inputGroup}>
              <FaUser />
              <input
                type="text"
                className={styles.input}
                id="last_name"
                autoComplete="off"
                placeholder="Last Name"
                value={values.last_name}
                onChange={handleChange}
              />
            </div>
            <span className="text-xs text-red-400">
              {errors.last_name &&
                `${errors.last_name
                  .at(0)
                  ?.toUpperCase()}${errors.last_name.slice(1)}`}
            </span>
          </div>

          <div className={styles.group}>
            <label htmlFor="username" className={styles.label}>
              Enter Username
            </label>
            <div className={styles.inputGroup}>
              <FaUser />
              <input
                type="text"
                className={styles.input}
                id="username"
                autoComplete="off"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <span className="text-xs text-red-400">
              {errors.username &&
                `${errors.username.at(0)?.toUpperCase()}${errors.username.slice(
                  1
                )}`}
            </span>
          </div>

          <div className={styles.group}>
            <label htmlFor="email" className={styles.label}>
              Enter Email
            </label>
            <div className={styles.inputGroup}>
              <MdEmail className={styles.icon} />
              <input
                type="email"
                className={styles.input}
                id="email"
                autoComplete="off"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
            </div>{" "}
            <span className="text-xs text-red-400">
              {errors.email &&
                `${errors.email.at(0)?.toUpperCase()}${errors.email.slice(1)}`}
            </span>
          </div>

          <div className={styles.group}>
            <label htmlFor="password" className={styles.label}>
              Enter Password
            </label>

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
          </div>

          <div className={styles.group}>
            <label htmlFor="password_confirmation" className={styles.label}>
              Enter Confirm Password
            </label>

            <div className={styles.inputGroup}>
              <IoIosLock className="text-3xl" />
              <input
                type={show ? "text" : "password"}
                className={styles.input}
                id="password_confirmation"
                autoComplete="off"
                placeholder="Confirm Password"
                value={values.password_confirmation}
                onChange={handleChange}
              />
              <div className={styles.toggleBtn} onClick={toggleShow}>
                {show ? "Hide" : "Show"}
              </div>
            </div>
            <span className="text-xs text-red-400">
              {errors.password_confirmation &&
                `${errors.password_confirmation
                  .at(0)
                  ?.toUpperCase()}${errors.password_confirmation.slice(1)}`}
            </span>
          </div>

          <div className={styles.btn} onClick={submitForm}>
            {loading ? "Processing..." : "Continue"}
          </div>
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
            Already have an account?{" "}
            <Link className={styles.link} href={"/login"}>
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
      {showModal && <EmailSent email={email} setShow={setShowModal} />}
    </>
  );
};

export default SignUp;
