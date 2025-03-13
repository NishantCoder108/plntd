"use client";

import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";
import { formatString } from "@/lib/utils";

export default function TransactionTable() {
  const { data, isLoading, error } = api.txns.readLatestTxns.useQuery({
    state: "LATEST",
  });

  if (isLoading) return <p> Loading table...</p>;

  if (error) return <p> Error: {error.message}</p>;

  const latestTxns = data?.latestTxns || [];
  return (
    <div className="w-full p-4 space-y-4 text-white">
      <div className="">
        <div className="relative w-full overflow-auto">
          <h1 className="text-xl font-bold  py-2 px-2 text-[#A3DE83]">
            Latest Transaction
          </h1>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-none font-bold text-base">
                <TableHead className="w-[80px] font-medium">S.no</TableHead>
                <TableHead className="font-bold ">Amount</TableHead>
                <TableHead className="text-center">From</TableHead>
                <TableHead className="text-center">To</TableHead>
                <TableHead className="text-center">Timestamp</TableHead>
                <TableHead className="text-center ">Signature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {latestTxns.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className=" border-none hover:bg-muted/50 "
                >
                  <TableCell className="py-4">{transaction.id}</TableCell>
                  <TableCell className="py-4">{transaction.amount}</TableCell>
                  <TableCell className="py-4 text-center">
                    {transaction.from}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    {transaction.to}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center py-4">
                    {transaction.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <span>{formatString(transaction.signature, 5, 5)}</span>
                      <Link
                        href={`https://explorer.solana.com/tx/${transaction.signature}?cluster=devnet`}
                        passHref
                        target="_blank"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 cursor-pointer hover:scale-110 transition"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span className="sr-only">
                            View on Solana Explorer
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
