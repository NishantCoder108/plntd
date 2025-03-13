"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TradeCard from "./TradeCard";
import sol_token from "/public/sol_token.svg";
import plntd_token from "/public/plntd_token.svg";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { MINTER_PUBLIC_KEY, TOKEN_MINT_ADDRESS } from "@/constants/wallet";
import {
  getAssociatedTokenAddress,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

export default function TradeToken() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [solAmount, setSolAmount] = useState<string>("1");
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTrade = async (type: "buy" | "sell") => {
    if (!publicKey) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    setIsLoading(true);
    if (type === "sell") return;
    try {
      const walletPubKey = new PublicKey(MINTER_PUBLIC_KEY);
      const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);

      const associatedTokenAdd = await getAssociatedTokenAddress(
        tokenMint,
        walletPubKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      console.log("associatedTokenAdd", associatedTokenAdd.toString());

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: associatedTokenAdd,
          lamports: Number(solAmount) * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);

      console.log({ signature });

      const confirmTransaction = await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "confirmed"
      );

      console.log({ confirmTransaction });

      toast.success("Tokens Purchased!");
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again");
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col mb-8 bg-[#1E1E1E] font-roboto  text-white ">
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("buy")}
          className={`mr-6 text-lg font-medium ${
            activeTab === "buy" ? "text-[#A6E264]" : "text-gray-400"
          }`}
        >
          BUY
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`text-lg font-medium ${
            activeTab === "sell" ? "text-[#A6E264]" : "text-gray-400"
          }`}
        >
          SELL
        </button>
      </div>

      {/* Buying PLNTD */}
      {activeTab === "buy" && (
        <TradeCard
          setSolAmount={() => {}}
          isInput={false}
          inputValue={`${Number(solAmount) * 2}`}
          imgStr={plntd_token}
          tokenName="PLNTD"
          tokenBalance="0"
          tokenNameCheckout="You Buy"
        />
      )}
      {activeTab === "buy" && (
        <TradeCard
          setSolAmount={setSolAmount}
          isInput={true}
          inputValue={solAmount}
          imgStr={sol_token}
          tokenName="SOL"
          tokenBalance="3.2"
          tokenNameCheckout="You Spend"
        />
      )}

      {/* Selling PLNTD */}
      {activeTab === "sell" && (
        <TradeCard
          setSolAmount={setSolAmount}
          isInput={false}
          inputValue={"0.5"}
          imgStr={sol_token}
          tokenName="SOL"
          tokenBalance="3.2"
          tokenNameCheckout="You Spend"
        />
      )}
      {activeTab === "sell" && (
        <TradeCard
          setSolAmount={() => {}}
          isInput={true}
          inputValue={solAmount}
          imgStr={plntd_token}
          tokenName="PLNTD"
          tokenBalance="0"
          tokenNameCheckout="You Sell"
        />
      )}

      {activeTab === "buy" && (
        <Button
          disabled={isLoading}
          onClick={() => handleTrade("buy")}
          className="w-full mt-4 py-6 text-lg cursor-pointer font-medium rounded-full bg-[#A6E264] hover:bg-[#95CC58] text-black"
        >
          Buy PLNTD
        </Button>
      )}

      {activeTab === "sell" && (
        <Button
          disabled={isLoading}
          className="w-full mt-4 py-6 cursor-pointer text-lg font-medium rounded-full bg-[#e76e50] hover:bg-[#d25d47] text-black"
        >
          Sell PLNTD
        </Button>
      )}
    </div>
  );
}
