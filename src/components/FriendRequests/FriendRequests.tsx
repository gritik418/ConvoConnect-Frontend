import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import FriendRequestTile from "../FriendRequestTile/FriendRequestTile";
import {
  RequestType,
  UserDataType,
  selectUser,
} from "@/features/user/userSlice";
import { useSelector } from "react-redux";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const FriendRequests = ({ isOpen, onClose }: PropsType) => {
  const user: UserDataType = useSelector(selectUser);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <div className="flex justify-between items-center">
            Friend Requests
            <IoCloseCircle
              onClick={onClose}
              className="text-3xl cursor-pointer"
            />
          </div>
        </ModalHeader>

        <ModalBody className="mb-8 max-h-[600px] overflow-y-scroll flex flex-col gap-4">
          {user?.requests &&
            user?.requests.map((request: RequestType) => (
              <FriendRequestTile key={request._id} request={request} />
            ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FriendRequests;
