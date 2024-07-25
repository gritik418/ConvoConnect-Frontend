import { SelectMemberType } from "@/app/group/create/page";
import { Avatar } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

type PropsType = {
  selectedMembers: string[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<string[]>>;
  member: SelectMemberType;
};

const GroupMemberSelectItem = ({
  member,
  selectedMembers,
  setSelectedMembers,
}: PropsType) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedMembers([...selectedMembers, e.target.name]);
    } else {
      const filteredMembers = selectedMembers.filter((member: string) => {
        return member !== e.target.name;
      });
      setSelectedMembers(filteredMembers);
    }
  };

  return (
    <label
      htmlFor={member._id}
      className="cursor-pointer rounded-lg bg-slate-100 w-full pr-4 justify-between h-[80px] p-2 flex items-center"
    >
      <div className="flex gap-2">
        <Avatar
          name={`${member?.first_name} ${member?.last_name}`}
          src={member?.avatar || ""}
        />

        <div className="flex flex-col">
          <p className="font-semibold">
            {member?.first_name} {member?.last_name}
          </p>
          <p className="text-gray-500">{member?.username}</p>
        </div>
      </div>
      <input
        type="checkbox"
        onChange={handleChange}
        name={member._id}
        id={member._id}
        className="cursor-pointer text-2xl border-2 p-1 accent-[#095699] outline-none rounded-full h-[30px] w-[30px]"
      />
    </label>
  );
};

export default GroupMemberSelectItem;
