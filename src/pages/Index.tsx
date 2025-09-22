import { EnhancedStarfield } from "@/components/EnhancedStarfield";
import { WalletConnect } from "@/components/WalletConnect";
import { VerificationLoader } from "@/components/VerificationLoader";
import { motion } from "framer-motion";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc721";
import { client, monadTestnet, NADS_CONTRACT_ADDRESS } from "@/lib/thirdweb";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const contract = getContract({
  client,
  chain: monadTestnet,
  address: NADS_CONTRACT_ADDRESS,
});

const Index = () => {
  const account = useActiveAccount();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const { data: balance, isLoading } = useReadContract(
    balanceOf,
    {
      contract,
      owner: account?.address || "",
    }
  );

  useEffect(() => {
    if (account && !isLoading && balance !== undefined) {
      setIsNavigating(true);
      const timer = setTimeout(() => {
        if (balance > 0n) {
          navigate("/members");
        } else if (balance === 0n) {
          navigate("/locked");
        }
      }, 1500); // Show animation for 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [account, balance, isLoading, navigate]);

  // Show verification loader when wallet is connected and checking SBT
  if (account && (isLoading || isNavigating)) {
    return <VerificationLoader />;
  }

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <EnhancedStarfield />
      
      {/* Minimalist Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-0 right-0 flex justify-center items-center px-8 z-10"
      >
        <h1 className="text-2xl md:text-3xl font-light text-white tracking-wider">
          Nads Central
        </h1>
      </motion.header>
      
      {/* Central Gateway Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-extralight text-white mb-8 leading-tight tracking-wide">
            Enter the
            <span className="block text-gradient-cosmic font-light">
              Cosmic Gateway
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed max-w-lg mx-auto">
            Access requires a Nads Central SBT
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center"
        >
          <WalletConnect />
        </motion.div>
      </motion.div>
      
      {/* Subtle Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 text-center z-10"
      >
        <p className="text-sm text-white/40 font-light">
          Powered by Monad • Built for the cosmos
        </p>
      </motion.footer>
    </div>
  );
};

export default Index;
