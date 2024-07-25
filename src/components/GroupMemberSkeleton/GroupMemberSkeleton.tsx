import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

const GroupMemberSkeleton = () => {
  return (
    <div className="rounded-lg bg-slate-100 w-full pr-4 justify-between h-[80px] p-2 flex items-center">
      <div className="flex gap-2">
        <SkeletonCircle size={"50px"} />
        <div className="flex flex-col justify-between">
          <Skeleton height={"20px"} width={"120px"} />
          <Skeleton height={"15px"} width={"60px"} />
        </div>
      </div>
      <Skeleton height={"30px"} width={"30px"} />
    </div>
  );
};

export default GroupMemberSkeleton;
