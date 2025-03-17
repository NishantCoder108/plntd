"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TradeCard from "./TradeCard";
import sol_token from "/public/sol_token.svg";
import plntd_token from "/public/plntd_token.svg";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINTER_PUBLIC_KEY,
  PLNTD_SOL_ADDRESS,
  RPC_URL,
  TOKEN_MINT_ADDRESS,
} from "@/constants/wallet";
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  TOKEN_2022_PROGRAM_ID,
  transferChecked,
} from "@solana/spl-token";
import { formatString } from "@/lib/utils";
import Link from "next/link";

export default function TradeToken() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [solAmount, setSolAmount] = useState<string>("1");
  const [plntdAmount, setPlntdAmount] = useState<string>("0.5");
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [plntdBalance, setPlntdBalance] = useState<number>(0);
  const [solBalance, setSolBalance] = useState<number>(0);

  const { publicKey, sendTransaction, signTransaction, wallet } = useWallet();

  const conn = new Connection(RPC_URL);

  const getStakedTokenBalance = async (
    walletAddress: PublicKey
  ): Promise<number> => {
    try {
      const walletPubkey = walletAddress;
      const tokenMintPubkey = new PublicKey(TOKEN_MINT_ADDRESS);

      const associatedTokenAddress = await getAssociatedTokenAddress(
        tokenMintPubkey,
        walletPubkey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      const accountInfo = await getAccount(
        conn,
        associatedTokenAddress,
        "confirmed",
        TOKEN_2022_PROGRAM_ID
      );

      console.log({ accountInfo });
      setPlntdBalance(Number(accountInfo.amount));

      return Number(accountInfo.amount);
    } catch (error) {
      console.log({ error });

      return 0;
    }
  };

  const fetchUserBalance = async (
    walletAddress: PublicKey
  ): Promise<number> => {
    try {
      const conn = new Connection(RPC_URL);
      const balance = await conn.getBalance(walletAddress);
      setSolBalance(balance / LAMPORTS_PER_SOL);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.log({ error });
      setSolBalance(0);
      return 0;
    }
  };
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
          toPubkey: new PublicKey(MINTER_PUBLIC_KEY),
          lamports: Number(solAmount) * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);

      console.log({ signature });
      const {
        blockhash: confirmBlockhash,
        lastValidBlockHeight: confirmLastValidBlockHeight,
      } = await connection.getLatestBlockhash();
      const confirmTransaction = await connection.confirmTransaction(
        {
          signature,
          blockhash: confirmBlockhash,
          lastValidBlockHeight: confirmLastValidBlockHeight,
        },
        "confirmed"
      );

      console.log({ confirmTransaction });

      toast.success("Tokens Purchased!");
      setIsLoading(false);
      getStakedTokenBalance(publicKey);
      fetchUserBalance(publicKey);
    } catch (error) {
      toast.error("Something went wrong. Please try again");
      console.log(error);
      setIsLoading(false);
    }
  };

  const ataExists = async (connection: Connection, ataAddress: PublicKey) => {
    try {
      const account = await getAccount(
        connection,
        ataAddress,
        "confirmed",
        TOKEN_2022_PROGRAM_ID
      );
      console.log({ account });
      return true;
    } catch {
      return false;
    }
  };

  const handleSell = async () => {
    if (!publicKey) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    setIsLoading(true);
    try {
      const walletPubKey = new PublicKey(MINTER_PUBLIC_KEY);
      const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);

      const senderATA = await getAssociatedTokenAddress(
        tokenMint,
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      console.log("senderATA address 01: ", senderATA.toString());

      if (!ataExists(connection, senderATA)) {
        toast.error("Sender ATA does not exist");
        return;
      }

      const recipientATA = await getAssociatedTokenAddress(
        tokenMint,
        walletPubKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      console.log("recipientATA address : ", recipientATA.toString());

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      const txns = new Transaction().add(
        createTransferCheckedInstruction(
          senderATA, // from (should be a token account)
          tokenMint, // mint
          recipientATA, // to (should be a token account)
          publicKey, // from's owner
          Number(plntdAmount) * 1000000,
          6,
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      txns.recentBlockhash = blockhash;
      txns.feePayer = publicKey;
      const signature = await sendTransaction(txns, connection);

      console.log({ signature });

      const confirmTransaction = await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "confirmed"
      );

      console.log({ confirmTransaction });

      toast.success(
        `Transaction successful with signature: ${formatString(
          signature,
          5,
          5
        )}`
      );

      setIsLoading(false);
      getStakedTokenBalance(publicKey);
      fetchUserBalance(publicKey);
    } catch (error) {
      toast.error("Something went wrong. Please try again");
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      getStakedTokenBalance(publicKey);
      fetchUserBalance(publicKey);
    }
  }, [publicKey]);
  return (
    <div className="flex flex-col mb-8 bg-[#1E1E1E] font-roboto  text-white ">
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("buy")}
          className={`cursor-pointer mr-6 text-lg font-medium   ${
            activeTab === "buy" ? "text-[#A6E264]" : "text-gray-400"
          }`}
        >
          BUY
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`cursor-pointer text-lg font-medium ${
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
          tokenName="PLANTD"
          tokenBalance={`${(plntdBalance / 1000000).toFixed(2)}`}
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
          tokenBalance={`${solBalance.toFixed(2)}`}
          tokenNameCheckout="You Spend"
        />
      )}

      {/* Selling PLNTD */}
      {activeTab === "sell" && (
        <TradeCard
          setSolAmount={() => {}}
          isInput={false}
          inputValue={`${Number(plntdAmount) / 2}`}
          imgStr={sol_token}
          tokenName="SOL"
          tokenBalance={`${solBalance.toFixed(2)}`}
          tokenNameCheckout="You Spend"
        />
      )}
      {activeTab === "sell" && (
        <TradeCard
          setSolAmount={setPlntdAmount}
          isInput={true}
          inputValue={plntdAmount}
          imgStr={plntd_token}
          tokenName="PLANTD"
          tokenBalance={`${(plntdBalance / 1000000).toFixed(2)}`}
          tokenNameCheckout="You Sell"
        />
      )}

      {activeTab === "buy" && (
        <Button
          disabled={isLoading}
          onClick={() => handleTrade("buy")}
          className="w-full mt-4 py-6 text-base cursor-pointer font-medium rounded-full bg-[#A6E264] hover:bg-[#95CC58] text-black"
        >
          Buy PLNTD
        </Button>
      )}

      {activeTab === "sell" && (
        <Button
          disabled={isLoading}
          onClick={handleSell}
          className="w-full mt-4 py-6 cursor-pointer text-base font-medium rounded-full bg-[#e76e50] hover:bg-[#d25d47] text-black"
        >
          Sell PLANTD
        </Button>
      )}
    </div>
  );
}
