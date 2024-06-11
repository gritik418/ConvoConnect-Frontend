"use client";
import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaHamburger } from "react-icons/fa";
import NavbarDrawer from "../NavbarDrawer/NavbarDrawer";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.container}>
      <Link className={styles.logo} href={"/"}>
        ConvoConnect
      </Link>

      <ul className={styles.navItems}>
        <Tooltip
          label="Create Group"
          hasArrow
          borderRadius={"8px"}
          backgroundColor={"gray"}
        >
          <li className={styles.item}>
            <FiPlus className="text-3xl" />
          </li>
        </Tooltip>

        <Tooltip
          label="Add Friend"
          hasArrow
          borderRadius={"8px"}
          backgroundColor={"gray"}
        >
          <li className={styles.item}>
            <FaUserPlus className="text-3xl" />
          </li>
        </Tooltip>

        <Tooltip
          label="Notifications"
          hasArrow
          borderRadius={"8px"}
          backgroundColor={"gray"}
        >
          <li className={styles.item}>
            <IoMdNotifications className="text-3xl" />
          </li>
        </Tooltip>

        <ProfileMenu />
      </ul>

      <div className={`${styles.hamburger} flex items-center gap-4`}>
        <span className={styles.hamburger}>
          <ProfileMenu />
        </span>

        <FaHamburger className={styles.hamburger} onClick={onOpen} />
      </div>

      <NavbarDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Navbar;
