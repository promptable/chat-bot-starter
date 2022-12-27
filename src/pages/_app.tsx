"use client";

import { type AppType } from "next/app";
import ThemeProvider from "@components/ui/Theme/ThemeProvider";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { v4 as uuid } from "uuid";
import { atom } from "jotai";

// Create a client
const queryClient = new QueryClient();

export const chatUserIdAtom = atom(uuid());

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    // Provide the client to your App
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
