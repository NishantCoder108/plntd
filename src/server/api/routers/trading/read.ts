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
      orderBy: { txnTimestamp: "desc" },
      take: input.state === "ALL" ? undefined : 5,
    });

    const solPriceInUsd = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    ).then((res) => res.json().then((data) => data.solana.usd));

    console.log("Sol price in usd", solPriceInUsd);
    const formattedTxns = latestTxns.map((txn) => ({
      amount:
        txn.txnType === "MINT"
          ? `${(Number(txn.amount) / 1000000000) * solPriceInUsd} USD`
          : `${(Number(txn.amount) / 1000000) * 0.5 * solPriceInUsd} USD`,

      timestamp: txn.txnTimestamp,
    }));

    return { latestTrading: formattedTxns, solPriceInUsd };
  });
