"use client";
import { useSocket } from "@/contexts/socketContext";
import { useEffect, useState } from "react";

export const SocketStatus = () => {
  const { isConnected } = useSocket();
  const [lastPing, setLastPing] = useState<Date | null>(null);

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setLastPing(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg shadow-lg">
      <div
        className={`w-3 h-3 rounded-full ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className="text-sm">
        {isConnected ? "Connected" : "Disconnected"}
      </span>
      {lastPing && (
        <span className="text-xs text-gray-400">
          Last Update: {lastPing.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};
