import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import SocketProvider from "@/contexts/socket/SocketProvider";
import ApolloGraphQLProvider from "@/providers/ApolloGraphQLProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetUser from "@/components/GetUser/GetUser";
import GetCookies from "@/components/GetCookies/GetCookies";
import SetCookies from "@/components/SetCookies/SetCookies";
import NotificationProvider from "@/contexts/notifications/NotificationProvider";
import SocketHandler from "@/components/SocketHandler/SocketHandler";
import { ChakraProvider } from "@chakra-ui/react";

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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ChakraProvider>
          <ApolloGraphQLProvider>
            <ReduxProvider>
              <SocketProvider>
                <GetUser />
                <SetCookies cookie={cookie} />
                <NotificationProvider>
                  <SocketHandler>{children}</SocketHandler>
                </NotificationProvider>
              </SocketProvider>
            </ReduxProvider>
          </ApolloGraphQLProvider>
        </ChakraProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
