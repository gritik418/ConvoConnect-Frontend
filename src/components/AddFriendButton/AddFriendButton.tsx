import React from "react";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import AddFriend from "../AddFriend/AddFriend";
import styles from "./AddFriendButton.module.css";

const AddFriendButton = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Tooltip
        label="Add Friend"
        hasArrow
        borderRadius={"8px"}
        backgroundColor={"gray"}
      >
        <li onClick={onOpen} className={styles.item}>
          <FaUserPlus className="text-3xl" />
        </li>
      </Tooltip>

      <AddFriend isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddFriendButton;
