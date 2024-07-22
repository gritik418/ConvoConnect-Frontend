import { selectMessageLoading } from "@/features/message/messageSlice";
import React, { HTMLAttributes, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "../MessageItem/MessageItem";
import Image from "next/image";

interface PropsType extends HTMLAttributes<HTMLDivElement> {
  messages: MessageType[];
}

const MessagePlayground = ({ messages, ...props }: PropsType) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const loading: boolean = useSelector(selectMessageLoading);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div {...props}>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Image
            className="mt-10"
            src={"/images/loading.gif"}
            alt="loading"
            priority={true}
            height={120}
            width={120}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {messages.map((message: MessageType) => {
            return <MessageItem key={message._id} message={message} />;
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessagePlayground;
