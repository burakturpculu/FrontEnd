"use client";

import { ReactNode, Suspense } from "react";
import MeloAppQueryClientProvider from "./MeloAppQueryClientProvider";

import { ChakraProvider } from "@chakra-ui/react";
import { AppProgressBar } from "next-nprogress-bar";

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <MeloAppQueryClientProvider>
      <Suspense>
        <AppProgressBar />
      </Suspense>
      <ChakraProvider>{children}</ChakraProvider>
    </MeloAppQueryClientProvider>
  );
}
