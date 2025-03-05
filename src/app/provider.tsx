"use client";
import { SocketProvider } from "@/contexts/socketContext";
import React from "react";

const provider = ({ children }: { children: React.ReactNode }) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default provider;
