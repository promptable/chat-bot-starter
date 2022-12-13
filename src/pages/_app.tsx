import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@components/ui/Theme/ThemeProvider";
import { atomWithStorage } from "jotai/utils";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { v4 as uuid } from "uuid";

// Create a client
const queryClient = new QueryClient();

export const chatUserIdAtom = atomWithStorage("chatUserId", uuid());

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // Provide the client to your App
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
