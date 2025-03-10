"use client";
import { PROTOCOL_CONFIG } from "@/constants/protocol";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { Button } from "./ui/button";
// import { ChevronDown, Shield } from "lucide-react";
// import { useWallet } from "@solana/wallet-adapter-react";
import {
  //   BaseWalletMultiButton,
  //   WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// import { useSocket } from "@/contexts/socketContext";
// import toast from "react-hot-toast";
// import { WALLET_LABELS } from "@/constants/wallet";

const Navbar = () => {
  //   const { publicKey, connected, disconnect } = useWallet();
  //   const socket = useSocket();
  //   const wallet = useWallet();
  //   const isWalletConnected = wallet.connected;

  //   const connectedStyle = {
  //     border: "1px solid #9333ea",
  //     background: "#9333ea",
  //     borderRadius: "1rem",
  //     height: "2.3rem",
  //   };
  //   const disconnectedStyle = {
  //     border: "1px solid #9333ea",
  //     background: "#9333ea",
  //     borderRadius: "1rem",
  //     height: "2.3rem",
  //     fontSize: "0.9rem",
  //     fontFamily: "inherit",
  //   };
  //   const disconnectWallet = () => {
  //     disconnect();
  //     toast.success("Wallet disconnected successfully");

  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-950">
            {PROTOCOL_CONFIG.NAME}
          </h1>
          <p className="text-gray-400">Eco-friendly crypto staking platform</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {publicKey?.toBase58().slice(0, 4) +
                    "..." +
                    publicKey?.toBase58().slice(-4)}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="">
                <DropdownMenuItem
                  onClick={disconnectWallet}
                  className="cursor-pointer "
                >
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <WalletModalProvider>
              <WalletMultiButton
                style={{ background: "transparent", color: "green" }}
              />
              {/* <WalletDisconnectButton /> */}
            </WalletModalProvider>
          </>
        </div>
      </div>
    </>
  );
};

export default Navbar;
