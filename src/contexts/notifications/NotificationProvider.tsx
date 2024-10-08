"use client";
import React, { useEffect, useState } from "react";
import NotificationContext from "./NotificationContext";
import { useToast } from "@chakra-ui/react";
import Notification from "@/components/Notification/Notification";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<HTMLAudioElement>(
    new Audio("/audio/Whistle.mp3")
  );
  const toast = useToast();

  const showNotification = (
    content: string,
    sender: MessageSenderType,
    chat: ChatType
  ) => {
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
          chat={chat}
        />
      ),
    });
  };

  useEffect(() => {
    setAudio(new Audio("/audio/Whistle.mp3"));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <div className="h-full w-[100vw]">{children}</div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
