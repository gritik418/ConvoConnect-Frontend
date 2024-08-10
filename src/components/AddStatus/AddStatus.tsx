import { selectUser } from "@/features/user/userSlice";
import { Avatar, useDisclosure } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import AddStatusModal from "../AddStatusModal/AddStatusModal";

const AddStatus = () => {
  const user: UserType = useSelector(selectUser);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <div className="h-[65px] mr-2 w-[65px] relative rounded-full border-2">
        <Avatar
          className="min-h-full min-w-full"
          src={user.avatar || ""}
          name="Ritik Gupta"
        />
        <div
          onClick={onOpen}
          className="cursor-pointer text-white bg-green-500 h-5 w-5 rounded-full grid place-items-center text-lg absolute bottom-0 right-0"
        >
          <IoMdAdd />
        </div>
      </div>

      <AddStatusModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddStatus;
