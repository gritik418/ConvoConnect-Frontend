"use client";
import { useCustomTheme } from "@/contexts/theme/ThemeProvider";

const StatusSection = () => {
  const { theme } = useCustomTheme();

  return (
    <div
      className={`p-2 h-[90px] border-b-2 ${
        theme === "dark" ? "border-b-[#0c0c19]" : "border-b-gray-200"
      }`}
    >
      <div className="bg-gray-200 h-full"></div>
    </div>
  );
};

export default StatusSection;
