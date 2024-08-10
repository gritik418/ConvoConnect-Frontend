import { Avatar, useDisclosure } from "@chakra-ui/react";
import { FriendStatusType } from "../StatusSection/StatusSection";
import FriendStatusModal from "../FriendStatusModal/FriendStatusModal";

const FriendStatusItem = ({
  friendStatus,
}: {
  friendStatus: FriendStatusType;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        onClick={onOpen}
        className="cursor-pointer min-h-[58px] h-[58px] min-w-[58px] w-[58px] rounded-full border-2 border-green-400"
      >
        <Avatar
          className="min-h-full min-w-full"
          src={friendStatus.avatar || ""}
          name={`${friendStatus.first_name} ${friendStatus.last_name}`}
        />
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
