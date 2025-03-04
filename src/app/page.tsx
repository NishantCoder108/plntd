"use client";
import TradingViewLightweight from "@/components/TradingChart";
import Image from "next/image";

export default function Home() {
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
      <div>hi</div>
    </div>
  );
}
