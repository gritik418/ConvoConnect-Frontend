import React, { useEffect } from "react";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const FriendStatusModal = ({ isOpen, onClose }: PropsType) => {
  const status: any = "";
  useEffect(() => {
    if (!status) return;

    let statusLength: number = status.images.length;

    if (statusLength === 0) {
      statusLength += 1;
    }
    const timerId = setTimeout(() => {
      onClose();
    }, statusLength * 3 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, isOpen]);
  return <div>FriendStatusModal</div>;
};

export default FriendStatusModal;
