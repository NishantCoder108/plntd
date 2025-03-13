import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { prisma } from "@/server/db";

export const readLatestTxns = publicProcedure
  .input(
    z.object({
      state: z.enum(["LATEST", "ALL"]),
    })
  )
  .query(async ({ input }) => {
    const latestTxns = await prisma.dBTransaction.findMany({
      orderBy: { txnTimestamp: "desc" },
      take: input.state === "LATEST" ? 5 : undefined,
    });

    const formattedTxns = latestTxns.map((txn, idx) => ({
      id: idx + 1,
      amount: `${Number(txn.amount) / 1000000000} ${
        txn.txnType === "MINT" ? "SOL" : "PLNTD"
      }`,
      from: txn.fromUserAccount,
      to: txn.toUserAccount,
      timestamp: txn.txnTimestamp,
      signature: txn.signature,
    }));

    return { latestTxns: formattedTxns };
  });
