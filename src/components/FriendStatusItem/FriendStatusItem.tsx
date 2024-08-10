import { Avatar, useDisclosure } from "@chakra-ui/react";
import { FriendStatusType } from "../StatusSection/StatusSection";
import FriendStatusModal from "../FriendStatusModal/FriendStatusModal";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";

const FriendStatusItem = ({
  friendStatus,
}: {
  friendStatus: FriendStatusType;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { theme } = useCustomTheme();

  return (
    <>
      <div onClick={onOpen} className="flex flex-col cursor-pointer">
        <div className="border-2 border-green-500 rounded-full">
          <Avatar
            className="min-h-[57px] min-w-[57px]"
            src={friendStatus.avatar || ""}
            size={"md"}
            name={`${friendStatus.first_name} ${friendStatus.last_name}`}
          />
        </div>
        <p
          className={`text-center text-xs ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {friendStatus.first_name.length > 12
            ? friendStatus.first_name.slice(0, 12) + "..."
            : friendStatus.first_name}
        </p>
      </div>

      <FriendStatusModal
        status={friendStatus.status!}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default FriendStatusItem;
