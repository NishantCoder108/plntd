"use client";
import { env } from "@/env";

export const RPC_URL =
  env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";

export const WALLET_LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Connect Wallet ",
} as const;

export const TOKEN_MINT_ADDRESS = env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS;

export const MINTER_PUBLIC_KEY = env.NEXT_PUBLIC_MINTER_PUBLIC_KEY;

export const WEBHOOK_URL = env.NEXT_PUBLIC_WEBHOOK_URL;
