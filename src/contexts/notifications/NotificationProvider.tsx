"use client";
import React from "react";
import NotificationContext from "./NotificationContext";
import { useToast } from "@chakra-ui/react";
import Notification from "@/components/Notification/Notification";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const audio = new Audio("/audio/Whistle.mp3");

  const showNotification = (content: string, sender: MessageSenderType) => {
    audio.play();
    toast({
      position: "top-right",
      duration: 2500,
      isClosable: true,
      render: (props) => (
        <Notification
          sender={sender}
          toastId={props.id}
          content={content}
          close={toast.close}
        />
      ),
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <div className="h-full w-[100vw]">{children}</div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
