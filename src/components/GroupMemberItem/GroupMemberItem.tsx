import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineMoreVert } from "react-icons/md";
import UserProfile from "../UserProfile/UserProfile";
import { IoIosRemoveCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

const GroupMemberItem = ({
  member,
  adminIds,
}: {
  member: ChatMemberType;
  adminIds: string[];
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const user: UserType = useSelector(selectUser);

  return (
    <>
      {member && user && member._id.toString() === user._id.toString() ? (
        <div className="bg-white p-3 rounded-md flex justify-between">
          <div className="flex gap-2">
            <Avatar
              src={member.avatar || ""}
              name={`${member.first_name} ${member.last_name}`}
            />

            <div className="flex items-center">
              <p className="text-xl text-green-500 font-bold">You</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-3 rounded-md flex justify-between">
          <div className="flex gap-2">
            <Avatar
              src={member.avatar || ""}
              name={`${member.first_name} ${member.last_name}`}
            />

            <div className="">
              <p>
                {member.first_name} {member.last_name}
              </p>
              <p className="text-gray-400 font-semibold">{member.username}</p>
            </div>
          </div>

          <Menu>
            <MenuButton>
              <div className="h-[40px] shadow-md shadow-gray-200 w-[40px] cursor-pointer grid place-items-center rounded-md bg-gray-400">
                <MdOutlineMoreVert className="text-2xl text-white" />
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem className="gap-3" onClick={onOpen}>
                <FaUser /> User Profile
              </MenuItem>
              {adminIds.includes(user._id.toString()) &&
                !adminIds.includes(member._id.toString()) && (
                  <MenuItem className="gap-3">
                    <MdAdminPanelSettings /> Appoint as Group Admin
                  </MenuItem>
                )}
              {adminIds.includes(user._id.toString()) &&
                !adminIds.includes(member._id.toString()) && (
                  <MenuItem className="gap-3">
                    <IoIosRemoveCircle /> Remove from Group
                  </MenuItem>
                )}
            </MenuList>
          </Menu>

          <UserProfile isOpen={isOpen} onClose={onClose} user={member} />
        </div>
      )}
    </>
  );
};

export default GroupMemberItem;
