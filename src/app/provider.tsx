"use client";

import { ReactQueryProvider } from "./react-query-provider";
import { TRPCReactProvider } from "@/trpc/react";
// import { SessionProvider } from "next-auth/react";
// import { Toaster } from "react-hot-toast";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import SolanaProvider from "@/components/solana/solana-provider";
import { SocketProvider } from "@/contexts/socketContext";
import Navbar from "@/components/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* // <SessionProvider> */}
      <TRPCReactProvider>
        <ReactQueryProvider>
          <SolanaProvider>
            {/* <Toaster /> */}
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            {/* <SocketProvider> */}
            <Navbar />
            {children}
            {/* </SocketProvider> */};
          </SolanaProvider>
        </ReactQueryProvider>
      </TRPCReactProvider>
      {/* // </SessionProvider> */}
    </>
  );
}
