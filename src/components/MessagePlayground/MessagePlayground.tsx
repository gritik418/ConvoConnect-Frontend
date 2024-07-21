import { selectMessages } from "@/features/message/messageSlice";
import React, { HTMLAttributes } from "react";
import { useSelector } from "react-redux";

interface PropsType extends HTMLAttributes<HTMLDivElement> {}

const MessagePlayground = ({ ...props }: PropsType) => {
  const messages: MessageType[] = useSelector(selectMessages);
  console.log(messages);

  return <div {...props}>MessagePlayground</div>;
};

export default MessagePlayground;
