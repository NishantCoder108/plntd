"use client";
import logoImg from "/public/logo.svg";

import {
  BaseWalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { WALLET_LABELS } from "@/constants/wallet";
import { TreePalm } from "lucide-react";

const Navbar = () => {
  const { connected } = useWallet();

  return (
    <>
      <div className="flex py-2  md:py-4   justify-between  items-center mb-8">
        <div className="flex items-center ">
          <div>
            {/* <Image src={logoImg} title="plntd logo" alt="logo" width={55} /> */}
            <TreePalm color="#A3DE83" size={45} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <WalletModalProvider>
            <div className="flex items-center justify-between">
              <BaseWalletMultiButton
                style={connected ? connectedStyle : disconnectedStyle}
                labels={WALLET_LABELS}
              />
            </div>
          </WalletModalProvider>
        </div>
      </div>
    </>
  );
};

export default Navbar;

const connectedStyle = {
  height: "2.5rem",
  width: "10rem",
  fontSize: "1rem",
  borderRadius: "2rem",
  fontFamily: "var(--font-roboto)",
  cursor: "pointer",
  background: "#A3DE83",
  color: "#1E1E1E",
};
const disconnectedStyle = {
  height: "2.5rem",
  width: "10rem",
  fontSize: "1rem",
  border: ".5px solid gray",
  fontFamily: "var(--font-roboto)",
  background: "#A3DE83",
  color: "#1E1E1E",
  borderRadius: "2rem",
  cursor: "pointer",
};
