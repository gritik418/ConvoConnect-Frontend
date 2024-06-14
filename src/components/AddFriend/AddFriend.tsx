import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import UserTile from "../UserTile/UserTile";
import styles from "./AddFriend.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  searchUsersAsync,
  selectSearchLoading,
  selectSearchedUsers,
} from "@/features/friend/friendSlice";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
};

export type SearchedUserType = {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
};

const AddFriend = ({ isOpen, onClose }: PropsType) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>();

  const loading: boolean = useSelector(selectSearchLoading);
  const users: SearchedUserType[] = useSelector(selectSearchedUsers);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(searchUsersAsync(searchQuery));
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              value={searchQuery}
            />
            <IoCloseCircle
              onClick={onClose}
              className="text-3xl cursor-pointer"
            />
          </div>
        </ModalHeader>

        <ModalBody className={styles.list}>
          {loading ? (
            <h3>Loading....</h3>
          ) : (
            <>
              {users.map((user: SearchedUserType) => {
                return <UserTile key={user._id} user={user} />;
              })}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFriend;
