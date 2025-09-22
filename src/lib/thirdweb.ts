import { createThirdwebClient, defineChain } from "thirdweb";
import { createWallet } from "thirdweb/wallets";

export const client = createThirdwebClient({
  clientId: "7f76d06ca96705e637a0a1a841bfc1e4",
});

export const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpc: "https://10143.rpc.thirdweb.com",
  rpcUrls: {
    default: {
      http: ["https://10143.rpc.thirdweb.com"],
      webSocket: [],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: "https://monad-testnet.socialscan.io/",
    },
  },
});

export const NADS_CONTRACT_ADDRESS = "0x922dA3512e2BEBBe32bccE59adf7E6759fB8CEA2";

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];