import React from "react";
import { FaUserFriends } from "react-icons/fa";
import styles from "./FriendRequestButton.module.css";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { UserDataType, selectUser } from "@/features/user/userSlice";
import FriendRequests from "../FriendRequests/FriendRequests";

const FriendRequestButton = () => {
  const user: UserDataType = useSelector(selectUser);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Tooltip
        label="Friend Requests"
        hasArrow
        borderRadius={"8px"}
        backgroundColor={"gray"}
      >
        <li className={styles.item} onClick={onOpen}>
          <FaUserFriends className="text-3xl" />
          {user?.requests && user?.requests.length > 0 && (
            <p className={styles.count}>{user.requests?.length}</p>
          )}
        </li>
      </Tooltip>

      <FriendRequests isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default FriendRequestButton;
