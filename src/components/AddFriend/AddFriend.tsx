import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import UserTile from "../UserTile/UserTile";
import styles from "./AddFriend.module.css";
import { IoCloseCircle } from "react-icons/io5";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const AddFriend = ({ isOpen, onClose }: PropsType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <div className={styles.group}>
            <input
              type="text"
              placeholder="Search here..."
              className={styles.input}
            />
            <IoCloseCircle
              onClick={onClose}
              className="text-3xl cursor-pointer"
            />
          </div>
        </ModalHeader>

        <ModalBody className={styles.list}>
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
          <UserTile />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFriend;
