"use client";
import TradeChart from "@/components/trading/TradeChart";
import TradeToken from "@/components/trading/TradeToken";
import TransactionTable from "@/components/txnHistory/txnTable";
import { useSocket } from "@/contexts/socketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface IData {
  status: "FAILED" | "PENDING" | "SUCCESS";
  message: string;
}
export default function Home() {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleTokenTransfer = (data: IData) => {
      if (data.status === "PENDING") {
        toast.loading(data.message, {
          style: {
            fontSize: "14px",
            minWidth: "250px",
            border: "2px solid #282828",
          },
        });
      }

      if (data.status === "SUCCESS") {
        toast.remove();
        toast.success(data.message, {
          style: {
            fontSize: "14px",
            minWidth: "250px",
            border: "2px solid #a6e264",
          },
        });

        queryClient.invalidateQueries({
          queryKey: [
            ["txns", "readLatestTxns"],
            { input: { state: "LATEST" } },
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            ["trading", "readLatestTrading"],
            { input: { state: "LATEST" } },
          ],
        });
      }

      if (data.status === "FAILED") {
        toast.remove();
        toast.error(data.message, {
          style: {
            fontSize: "14px",
          },
        });
      }
    };

    socket.on("TOKEN_TRANSFER", handleTokenTransfer);
    socket.on("TOKEN_TRANSFER_FAILED", handleTokenTransfer);
    socket.on("TRANSFER_PLANTD_TOKEN", handleTokenTransfer);
    socket.on("TOKEN_TRANSFER_SUCCESS", handleTokenTransfer);
    socket.on("TOKEN_BURN_STARTED", handleTokenTransfer);
    socket.on("TRANSFER_NATIVE_TOKEN", handleTokenTransfer);

    return () => {
      socket.off("TOKEN_TRANSFER", handleTokenTransfer);
      socket.off("TOKEN_TRANSFER_FAILED", handleTokenTransfer);
      socket.off("TRANSFER_PLANTD_TOKEN", handleTokenTransfer);
      socket.off("TOKEN_TRANSFER_SUCCESS", handleTokenTransfer);
      socket.off("TOKEN_BURN_STARTED", handleTokenTransfer);
      socket.off("TRANSFER_NATIVE_TOKEN", handleTokenTransfer);
    };
  }, [socket, queryClient]);

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8 ">
        <div className="w-full lg:w-[75%]   py-4 bg-[#282828] rounded-4xl ">
          <TradeChart />
        </div>
        <div className="w-full mt-8 lg:mt-0 lg:w-[25%] ">
          <TradeToken />
        </div>
      </div>
      <div className="mt-8 lg:mt-20">
        <TransactionTable />
      </div>
    </div>
  );
}
