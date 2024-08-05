import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineAlternateEmail } from "react-icons/md";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  user: ChatMemberType;
};

const UserProfile = ({ isOpen, onClose, user }: PropsType) => {
  console.log(user);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="w-full overflow-hidden">
        <div className="flex w-full h-[140px] relative mb-[80px]">
          <p className="absolute z-20 top-3 left-3 bg-white rounded-md px-3 py-1">
            {user.username}
          </p>
          <Image
            src={user.background || ""}
            alt="bg"
            className="w-full absolute h-full"
            height={140}
            width={400}
          />
          <Avatar
            src={user.avatar || ""}
            height={"100px"}
            className="absolute z-10 -bottom-full -translate-y-[50%] left-[50%] -translate-x-[50%]"
            width={"100px"}
          />
        </div>
        <ModalBody>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col w-full">
              <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md mb-2">
                <FaUser />
                <p className="indent-4">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md mb-2">
                <MdOutlineAlternateEmail />
                <p className="indent-4">{user.username}</p>
              </div>
              <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md mb-2">
                <MdEmail />
                <p className="indent-4">{user.email}</p>
              </div>

              {user.bio && (
                <p className="flex items-center bg-gray-200 px-2 py-1 rounded-md mb-2">
                  🌟 {user.bio}
                </p>
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserProfile;
