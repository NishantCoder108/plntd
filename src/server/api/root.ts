import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user/index";
import { txnsRouter } from "./routers/transactions";

export const appRouter = createTRPCRouter({
  user: userRouter,
  txns: txnsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
