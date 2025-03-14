import { RPC_URL } from "@/constants/wallet";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";

function SolanaProvider({ children }: { children: React.ReactNode }) {
  // if (process.env.NODE_ENV === "production") {
  //   console.log = () => { };
  //   console.warn = () => { };
  //   console.error = () => { };
  // }
  return (
    <ConnectionProvider endpoint={RPC_URL}>
      <WalletProvider wallets={[]} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default SolanaProvider;
