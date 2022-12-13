import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@components/ui/Theme/ThemeProvider";
import { atomWithStorage } from "jotai/utils";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { v4 as uuid } from "uuid";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

// Create a client
const queryClient = new QueryClient();

export const chatUserIdAtom = atom(uuid());

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
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
