import { Socket } from "socket.io-client";

export type TradeData = {
  price: number;
  timestamp: number;
  type: "buy" | "sell";
  amount: number;
};

export type ChartData = {
  prices: number[];
  timestamps: number[];
};

export const subscribeToTrades = (
  socket: Socket,
  callback: (data: TradeData) => void
): void => {
  socket.on("trade", callback);
};

export const unsubscribeFromTrades = (
  socket: Socket,
  callback: (data: TradeData) => void
): void => {
  socket.off("trade", callback);
};

export const subscribeToChartData = (
  socket: Socket,
  callback: (data: ChartData) => void
): void => {
  socket.on("chartData", callback);
};

export const unsubscribeFromChartData = (
  socket: Socket,
  callback: (data: ChartData) => void
): void => {
  socket.off("chartData", callback);
};

export const emitTrade = (
  socket: Socket,
  tradeData: Omit<TradeData, "timestamp">
): void => {
  socket.emit("newTrade", tradeData);
};

export const requestChartData = (socket: Socket, timeframe: string): void => {
  socket.emit("getChartData", { timeframe });
};
