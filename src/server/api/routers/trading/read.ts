import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { prisma } from "@/server/db";

export const readLatestTrading = publicProcedure
  .input(
    z.object({
      state: z.enum(["LATEST", "ALL"]),
    })
  )
  .query(async ({ input }) => {
    const latestTxns = await prisma.dBTransaction.findMany({
      orderBy: { txnTimestamp: "asc" },
      take: input.state === "ALL" ? undefined : 5,
    });

    const solPriceInUsd = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    ).then((res) => res.json().then((data) => data.solana.usd || 0));

    console.log("Sol price in usd", solPriceInUsd);

    const buyTxns: { value: number; time: number }[] = [];
    const sellTxns: { value: number; time: number }[] = [];

    latestTxns.forEach((txn) => {
      if (txn.txnType === "MINT") {
        const amount = (Number(txn.amount) / 1000000000) * solPriceInUsd;

        const record = {
          value: amount,
          time: Number(txn.txnTimestamp),
        };
        buyTxns.push(record);
      } else {
        const amount = (Number(txn.amount) / 1000000) * 0.5 * solPriceInUsd;
        const record = {
          value: amount,
          time: Number(txn.txnTimestamp),
        };
        sellTxns.push(record);
      }
    });

    return {
      buyTxns,
      sellTxns,
    };
  });
