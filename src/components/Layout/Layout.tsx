import ChatSection from "@/components/ChatSection/ChatSection";
import Navbar from "@/components/Navbar/Navbar";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useCustomTheme();
  return (
    <div className={`h-[100vh] ${theme === "dark" ? "bg-[#000]" : ""}`}>
      <Navbar />
      <div className="h-[calc(100vh-60px)] flex">
        <div className="w-[100vw] sm:w-[500px] ">
          <ChatSection />
        </div>

        {children}
      </div>
    </div>
  );
}
