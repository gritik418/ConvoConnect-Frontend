import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

const UserTileSkeleton = () => {
  return (
    <div className="flex items-center h-full px-5 justify-between">
      <div className="flex gap-2">
        <SkeletonCircle size={"50px"} className="gap-2" />
        <div className="flex gap-2 flex-col">
          <Skeleton width={"120px"} height={"20px"} />
          <Skeleton width={"180px"} height={"20px"} />
        </div>
      </div>

      <Skeleton className="h-[40px] w-[40px] rounded-md" />
    </div>
  );
};

export default UserTileSkeleton;
