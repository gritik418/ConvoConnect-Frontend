import ChatSection from "@/components/ChatSection/ChatSection";
import Layout from "@/components/Layout/Layout";
import MessageSection from "@/components/MessageSection/MessageSection";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const Home = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <ChatSection
          style={{
            width: "650px",
          }}
        />
        <MessageSection
          style={{
            width: "100%",
          }}
        />
      </Layout>
    </>
  );
};

export default Home;
