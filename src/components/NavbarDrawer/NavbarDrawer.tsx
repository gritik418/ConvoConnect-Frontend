import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import styles from "./NavbarDrawer.module.css";
import { FaUserPlus } from "react-icons/fa";
import { FiPlus, FiLogOut } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const NavbarDrawer = ({ isOpen, onClose }: PropsType) => {
  const btnRef = React.useRef<any>();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className="mt-4" />
          <DrawerHeader className={styles.header}>ConvoConnect</DrawerHeader>

          <DrawerBody>
            <ul className={styles.navItems}>
              <button className={styles.btn}>
                <FaUserPlus className="text-3xl" />
                Add Friend
              </button>

              <button className={styles.btn}>
                <IoMdNotifications className="text-3xl" />
                Notifications
              </button>

              <button className={styles.btn}>
                <FiPlus /> Create Group
              </button>

              <button className={styles.btn}>
                <FiLogOut /> Logout
              </button>
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
