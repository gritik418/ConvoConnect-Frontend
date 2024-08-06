import React from "react";
import GroupAdminItem from "../GroupAdminItem/GroupAdminItem";

const GroupAdmins = ({ admins }: { admins: ChatAdminType[] }) => {
  return (
    <div className="container min-h-[40vh] mb-[100px] mx-auto p-4">
      <div className="bg-slate-100 rounded-lg p-4 flex flex-col">
        <h2 className="text-2xl mb-4">Group Admins</h2>
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
