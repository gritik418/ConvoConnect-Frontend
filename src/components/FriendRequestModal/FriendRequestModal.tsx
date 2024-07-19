import React from "react";

const FriendRequestModal = () => {
  return (
    <div className="fixed h-[100vh] w-[100vw] bg-slate-600 top-0  bg-opacity-40">
      <div className="rounded-xl px-6 py-4 max-w-[450px] w-[85%] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col">
        <h1> Friend Requests </h1>
      </div>
    </div>
  );
};

export default FriendRequestModal;
