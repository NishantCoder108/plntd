import { createTRPCRouter } from "../../trpc";
import { readLatestTrading } from "./read";

export const tradingRouter = createTRPCRouter({
  readLatestTrading: readLatestTrading,
});
