import { ConnectButton } from "thirdweb/react";
import { client, monadTestnet, wallets } from "@/lib/thirdweb";

export function WalletConnect() {
  return (
    <ConnectButton
      client={client}
      chain={monadTestnet}
      wallets={wallets}
      theme="dark"
      connectButton={{
        className: "btn-cosmic !px-7 !py-3 !text-base !font-light !rounded-xl !transition-all !duration-300 !hover:scale-[1.02] touch-target animate-pulse focus-visible:ring-4 focus-visible:ring-primary/60",
        label: "Connect Wallet",
      }}
      connectModal={{
        size: "wide",
        title: "Connect to the Cosmos",
        titleIcon: "🌌",
        welcomeScreen: {
          title: "Welcome to the 1 Million Nads Club",
          subtitle: "Connect your wallet to verify your super rare bluechip NFT ownership"
        }
      }}
      switchButton={{
        label: "Switch Network"
      }}
    />
  );
}
