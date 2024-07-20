import React, { HTMLAttributes } from "react";

interface PropsType extends HTMLAttributes<HTMLDivElement> {}

const MessagePlayground = ({ ...props }: PropsType) => {
  return <div {...props}>MessagePlayground</div>;
};

export default MessagePlayground;
