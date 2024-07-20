import ChatSection from "@/components/ChatSection/ChatSection";
import MessageSection from "@/components/MessageSection/MessageSection";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="h-[calc(100vh-60px)] flex">
        <ChatSection />
        <MessageSection />
      </div>
    </div>
  );
}
