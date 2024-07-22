import ChatSection from "@/components/ChatSection/ChatSection";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="h-[calc(100vh-60px)] flex">
        <ChatSection />

        {children}
      </div>
    </div>
  );
}