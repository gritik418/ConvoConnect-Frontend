import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="p-2 rounded-lg gap-2 flex cursor-pointer h-[70px] bg-slate-50 w-full items-center">
        <SkeletonCircle size={"50px"} />
        <div className="flex flex-col gap-2">
          <Skeleton height="20px" width={"80px"} />
          <Skeleton height="20px" width={"160px"} />
        </div>
      </div>
      <div className="p-2 rounded-lg gap-2 flex cursor-pointer h-[70px] bg-slate-50 w-full items-center">
        <SkeletonCircle size={"50px"} />
        <div className="flex flex-col gap-2">
          <Skeleton height="20px" width={"60px"} />
          <Skeleton height="20px" width={"180px"} />
        </div>
      </div>
      <div className="p-2 rounded-lg gap-2 flex cursor-pointer h-[70px] bg-slate-50 w-full items-center">
        <SkeletonCircle size={"50px"} />
        <div className="flex flex-col gap-2">
          <Skeleton height="20px" width={"90px"} />
          <Skeleton height="20px" width={"120px"} />
        </div>
      </div>
      <div className="p-2 rounded-lg gap-2 flex cursor-pointer h-[70px] bg-slate-50 w-full items-center">
        <SkeletonCircle size={"50px"} />
        <div className="flex flex-col gap-2">
          <Skeleton height="20px" width={"60px"} />
          <Skeleton height="20px" width={"160px"} />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
