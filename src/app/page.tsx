"use client";
import AppForm from "@/components/AppForm";
import TradingViewLightweight from "@/components/TradingChart";
import User from "@/components/User";
import { useSocket } from "@/contexts/socketContext";
import { useEffect } from "react";

export default function Home() {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected) return;

    socket.on("test", (data) => {
      console.log("Received test message:", data);
    });

    const interval = setInterval(() => {
      socket.emit("test", "Hello from the client!");
    }, 2000);

    return () => {
      socket.off("test");
      clearInterval(interval);
    };
  }, [socket, isConnected]);

  return (
    <div>
      <div className="h-[30rem] w-full relative">
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

      <div>
        <User />
      </div>
      <div>
        <AppForm />
      </div>
    </div>
  );
}
