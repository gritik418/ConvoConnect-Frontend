import React, { Dispatch, SetStateAction } from "react";
import { IoCloseCircle } from "react-icons/io5";

type PropsType = {
  setShow: Dispatch<SetStateAction<boolean>>;
  email: string;
};

const EmailSent = ({ setShow, email }: PropsType) => {
  return (
    <div className="fixed h-[100vh] w-[100vw] bg-slate-600 top-0  bg-opacity-40">
      <div className="rounded-xl px-6 py-4 max-w-[450px] w-[85%] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col">
        <IoCloseCircle
          className="ml-auto text-2xl cursor-pointer"
          onClick={() => setShow(false)}
        />
        <h1 className="text-2xl text-center mb-4">Email Sent</h1>
        <p className="text-sm text-center mb-6">
          An email has been sent to the{" "}
          <span className="font-bold"> {email}</span> email address. Follow the
          instructions provided in the email to continue with ConvoConnect.
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
