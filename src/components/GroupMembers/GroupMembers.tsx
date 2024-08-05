import React from "react";
import GroupMemberItem from "../GroupMemberItem/GroupMemberItem";

const GroupMembers = ({ members }: { members: ChatMemberType[] }) => {
  return (
    <div className="container min-h-[40vh] mb-[100px] mx-auto p-4">
      <div className="bg-slate-100 rounded-lg p-4 flex flex-col">
        <h2 className="text-2xl mb-4">Group Members</h2>
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
          {members &&
            members.map((member: ChatMemberType) => {
              return <GroupMemberItem key={member._id} member={member} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;
