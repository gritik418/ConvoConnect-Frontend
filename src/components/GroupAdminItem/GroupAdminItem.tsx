import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

const GroupAdminItem = ({ admin }: { admin: ChatAdminType }) => {
  const user: UserType = useSelector(selectUser);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      {admin._id.toString() === user._id.toString() ? (
        <div className="bg-white p-3 rounded-md flex justify-between">
          <div className="flex gap-2">
            <Avatar
              src={admin.avatar || ""}
              name={`${admin.first_name} ${admin.last_name}`}
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
              src={admin.avatar || ""}
              name={`${admin.first_name} ${admin.last_name}`}
            />

            <div className="">
              <p>
                {admin.first_name} {admin.last_name}
              </p>
              <p className="text-gray-400 font-semibold">{admin.username}</p>
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
            </MenuList>
          </Menu>

          <UserProfile isOpen={isOpen} onClose={onClose} user={admin} />
        </div>
      )}
    </>
  );
};

export default GroupAdminItem;
