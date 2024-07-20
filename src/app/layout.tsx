import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { ChakraProvider } from "@chakra-ui/react";
import SocketProvider from "@/contexts/SocketProvider";
import ApolloGraphQLProvider from "@/providers/ApolloGraphQLProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <ApolloGraphQLProvider>
            <ReduxProvider>
              <SocketProvider>{children}</SocketProvider>
            </ReduxProvider>
          </ApolloGraphQLProvider>
        </ChakraProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
