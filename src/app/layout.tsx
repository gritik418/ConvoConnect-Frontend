import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { ChakraProvider } from "@chakra-ui/react";
import SocketProvider from "@/contexts/SocketProvider";
import ApolloGraphQLProvider from "@/providers/ApolloGraphQLProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetUser from "@/components/GetUser/GetUser";
import GetCookies from "@/components/GetCookies/GetCookies";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCookie } from "@/features/auth/authSlice";
import SetCookies from "@/components/SetCookies/SetCookies";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConvoConnect",
  description: "Connect with your friends and family anytime and anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = GetCookies();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <ApolloGraphQLProvider>
            <ReduxProvider>
              <SocketProvider>
                <SetCookies cookie={cookie} />
                <GetUser />
                {children}
              </SocketProvider>
            </ReduxProvider>
          </ApolloGraphQLProvider>
        </ChakraProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
