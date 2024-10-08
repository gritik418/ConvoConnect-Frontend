import React from "react";
import GroupMemberItem from "../GroupMemberItem/GroupMemberItem";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";

const GroupMembers = ({
  members,
  adminIds,
}: {
  members: ChatMemberType[];
  adminIds: string[];
}) => {
  const { theme } = useCustomTheme();
  return (
    <div className="container min-h-[40vh] mb-[20px] mx-auto p-4">
      <div
        className={`rounded-lg p-4 flex flex-col ${
          theme === "dark" ? "bg-[#2d2b41]" : "bg-slate-100"
        }`}
      >
        <h2 className={`text-2xl mb-4 ${theme === "dark" ? "text-white" : ""}`}>
          Group Members
        </h2>
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
          {members &&
            members.map((member: ChatMemberType) => {
              return (
                <GroupMemberItem
                  adminIds={adminIds}
                  key={member?._id}
                  member={member}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;
