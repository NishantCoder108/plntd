"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

interface Transaction {
  id: number;
  amount: string;
  from: string;
  to: string;
  timestamp: string;
  signature: string;
}

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([
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
      signature: "5jgJ..nTds",
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
      signature: "7hgT..mRds",
    },
    {
      id: 5,
      amount: "1.2 SOL",
      from: "3QWE...R7ty",
      to: "N5fg...pO2q",
      timestamp: "March 10, 2025, 09:22:45 UTC",
      signature: "9jkL..pTws",
    },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full p-4 space-y-4 text-white">
      <div className="rounded-lg border bg-card">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[80px] font-medium">S.no</TableHead>
                <TableHead className="font-medium">Amount</TableHead>
                <TableHead className="font-medium">From</TableHead>
                <TableHead className="font-medium">To</TableHead>
                <TableHead className="font-medium">Timestamp</TableHead>
                <TableHead className="font-medium">Signature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.from}</TableCell>
                  <TableCell>{transaction.to}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transaction.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{transaction.signature}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(transaction.signature)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span className="sr-only">Copy signature</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
}
