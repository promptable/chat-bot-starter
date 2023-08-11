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

import React, { useEffect } from 'react';

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  // use effect hook to run code upon mounting of the component
  useEffect(() => {
    console.log("Component mounted");  // replace this with the intended code based on the later task
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
