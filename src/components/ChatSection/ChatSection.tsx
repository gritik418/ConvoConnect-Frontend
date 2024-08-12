"use client";
import { useEffect, useState } from "react";
import ChatItem from "../ChatItem/ChatItem";
import { useSelector } from "react-redux";
import { selectChats, selectChatsLoading } from "@/features/chat/chatSlice";
import { selectUser } from "@/features/user/userSlice";
import ChatSkeleton from "../ChatSkeleton/ChatSkeleton";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";
import StatusSection from "../StatusSection/StatusSection";

type UserType = {
  _id: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  username: string;
};

const ChatSection = () => {
  const initialChats: ChatType[] | [] = useSelector(selectChats);
  const user: UserType = useSelector(selectUser);
  const loading: boolean = useSelector(selectChatsLoading);
  const [chats, setChats] = useState<any>(initialChats);
  const { theme } = useCustomTheme();

  useEffect(() => {
    if (!initialChats) return;
    const sortedChats = Object.values(initialChats).sort(
      (a: ChatType, b: ChatType) => {
        return (
          new Date(b?.updatedAt).getTime() - new Date(a?.updatedAt).getTime()
        );
      }
    );

    setChats(sortedChats);
  }, [initialChats]);

  return (
    <div
      className={`w-full h-full ${
        theme === "dark" ? "bg-[#282840]" : "bg-gray-50"
      }`}
    >
      <StatusSection />

      <div
        className={`p-4 h-[calc(100%-90px)] flex flex-col overflow-y-scroll gap-3 ${
          theme === "dark" ? "bg-[#282840]" : "bg-gray-200"
        }`}
      >
        {loading ? (
          <ChatSkeleton />
        ) : (
          <>
            {chats && chats.length > 0 ? (
              Object.values(chats).map((chat: ChatType | any) => {
                return <ChatItem key={chat?._id} id={user?._id} chat={chat} />;
              })
            ) : (
              <p
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                No Chats.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
