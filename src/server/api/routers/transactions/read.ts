import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const readLatestTxns = publicProcedure
  .input(
    z.object({
      state: z.enum(["LATEST", "ALL"]),
    })
  )
  .query(({ input }) => {
    return {
      latestTxns: [
        {
          id: 1,
          amount: "0.1 SOL",
          from: "9RNQ...K4fy",
          to: "K4fy...jY8d",
          timestamp: "March 11, 2025, 12:38:24 UTC",
          signature: "5jgJ..nTds",
        },
        {
          id: 2,
          amount: "0.1 SOL",
          from: "9RNQ...K4fy",
          to: "K4fy...jY8d",
          timestamp: "March 11, 2025, 12:38:24 UTC",
          signature: "9jkdsfdfsdfsdfdsfL..pTws",
        },
        {
          id: 3,
          amount: "0.1 SOL",
          from: "9RNQ...K4fy",
          to: "K4fy...jY8d",
          timestamp: "March 11, 2025, 12:38:24 UTC",
          signature: "5jgJ..nTds",
        },
        {
          id: 4,
          amount: "0.5 SOL",
          from: "8KLM...P3zy",
          to: "J7rt...kL9p",
          timestamp: "March 11, 2025, 11:45:12 UTC",
          signature: "7sfsfsdfsfshgT..mRds",
        },
        {
          id: 5,
          amount: "1.2 SOL",
          from: "3QWE...R7ty",
          to: "N5fg...pO2q",
          timestamp: "March 10, 2025, 09:22:45 UTC",
          signature: "9jkdsfdfsdfsdfdsfL..pTws",
        },
      ],

      message: input.state + ":" + "Transactions fetched successfully",
    };
  });
