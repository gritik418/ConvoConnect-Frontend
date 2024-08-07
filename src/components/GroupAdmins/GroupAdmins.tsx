import React from "react";
import GroupAdminItem from "../GroupAdminItem/GroupAdminItem";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";

const GroupAdmins = ({ admins }: { admins: ChatAdminType[] }) => {
  const { theme } = useCustomTheme();
  return (
    <div className="container min-h-[40vh] mb-[70px] mx-auto p-4">
      <div
        className={`rounded-lg p-4 flex flex-col ${
          theme === "dark" ? "bg-[#2d2b41]" : "bg-slate-100"
        }`}
      >
        <h2 className={`text-2xl mb-4 ${theme === "dark" ? "text-white" : ""}`}>
          Group Admins
        </h2>
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
          {admins &&
            admins.map((admin: ChatAdminType) => {
              return <GroupAdminItem key={admin._id} admin={admin} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default GroupAdmins;
