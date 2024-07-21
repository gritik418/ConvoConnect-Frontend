import { selectMessages } from "@/features/message/messageSlice";
import React, { HTMLAttributes, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "../MessageItem/MessageItem";

interface PropsType extends HTMLAttributes<HTMLDivElement> {
  userId: string;
}

const MessagePlayground = ({ userId, ...props }: PropsType) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const messages: MessageType[] = useSelector(selectMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div {...props}>
      <div className="flex flex-col">
        {messages.map((message: MessageType) => {
          return (
            <MessageItem userId={userId} key={message._id} message={message} />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagePlayground;
