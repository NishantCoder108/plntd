import React from "react";
import { api } from "@/trpc/react";

const TradeChart = () => {
  const { data, isLoading, error } = api.trading.readLatestTrading.useQuery(
    {
      state: "LATEST",
    },
    {
      staleTime: Infinity,
    }
  );
  return (
    <div>
      <h2>Trade Chart</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <pre>
          {JSON.stringify(
            data,
            (key, value) =>
              typeof value === "bigint" ? value.toString() + "n" : value,
            2
          )}
        </pre>
      )}
    </div>
  );
};

export default TradeChart;
