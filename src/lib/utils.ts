import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatString = (str: string, start: number, end: number) => {
  return str.slice(0, start) + "..." + str.slice(-end);
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
