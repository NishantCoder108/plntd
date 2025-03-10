"use client";

import React, { ReactNode } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>;
}
