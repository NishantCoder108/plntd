import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user/index";
import { txnsRouter } from "./routers/transactions";
import { tradingRouter } from "./routers/trading";

export const appRouter = createTRPCRouter({
  user: userRouter,
  txns: txnsRouter,
  trading: tradingRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
