"use client";
import AppForm from "@/components/AppForm";
import TradeToken from "@/components/trading/TradeToken";
import TradeCard from "@/components/trading/Trading";
import TradingViewLightweight from "@/components/TradingChart";
import TransactionTable from "@/components/txnHistory/txnTable";
import User from "@/components/User";
import { useSocket } from "@/contexts/socketContext";
import { useEffect } from "react";

export default function Home() {
  // const { socket, isConnected } = useSocket();

  // useEffect(() => {
  //   if (!isConnected) return;

  //   socket.on("test", (data) => {
  //     console.log("Received test message:", data);
  //   });

  //   const interval = setInterval(() => {
  //     socket.emit("test", "Hello from the client!");
  //   }, 2000);

  //   return () => {
  //     socket.off("test");
  //     clearInterval(interval);
  //   };
  // }, [socket, isConnected]);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 ">
        <div className="h-[31rem]  relative w-[70%] overflow-hidden  py-4 bg-[#282828] rounded-4xl ">
          <TradingViewLightweight
            symbol={"AAPL"}
            // timeframe={
            //   selectedTimeFrame?.tradingViewValue
            //     ? `${selectedTimeFrame?.tradingViewValue}m`
            //     : "60m"
            // }

            timeframe={"60m"}
          />
        </div>
        <div className="w-[30%] ">
          {/* <TradeCard /> */}
          <TradeToken />
        </div>
      </div>
      <div>
        <TransactionTable />
      </div>
      {/* <div>
        <User />
      </div> */}
    </div>
  );
}
