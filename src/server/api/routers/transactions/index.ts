import { createTRPCRouter } from "../../trpc";
import { readLatestTxns } from "./read";

export const txnsRouter = createTRPCRouter({
  readLatestTxns: readLatestTxns,
});
