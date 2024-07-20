"use client";
import ChatSection from "@/components/ChatSection/ChatSection";
import MessageSection from "@/components/MessageSection/MessageSection";
import Navbar from "@/components/Navbar/Navbar";
import { useSocket } from "@/contexts/SocketProvider";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";

const GET_CURRENT_USER = gql`
  query GetUserQuery {
    getCurrentLoggedInUser {
      first_name
      last_name
      avatar
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const socket = useSocket();
  console.log(data);
  if (error) {
    <p>{error.message}</p>;
  }
  if (loading) {
    return (
      <div className="h-[100vh] w-[100vw] grid place-items-center">
        <Image
          className="mt-10"
          src={"/images/loading.gif"}
          alt="loading"
          height={120}
          width={120}
        />
      </div>
    );
  }

  return (
    <div className="h-[100vh]">
      <Navbar
        user={{
          first_name: data?.getCurrentLoggedInUser.first_name,
          last_name: data?.getCurrentLoggedInUser.last_name,
          avatar: data?.getCurrentLoggedInUser.avatar,
        }}
      />
      <div className="h-[calc(100vh-60px)] flex">
        <ChatSection />
        <MessageSection />
      </div>
    </div>
  );
}
