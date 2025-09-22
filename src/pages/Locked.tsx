import { CosmicButton } from "@/components/CosmicButton";
import { EnhancedStarfield } from "@/components/EnhancedStarfield";
import { WalletConnect } from "@/components/WalletConnect";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc721";
import { client, monadTestnet, NADS_CONTRACT_ADDRESS } from "@/lib/thirdweb";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const contract = getContract({
  client,
  chain: monadTestnet,
  address: NADS_CONTRACT_ADDRESS,
});

export default function Locked() {
  const account = useActiveAccount();
  const navigate = useNavigate();

  const { data: balance, isLoading } = useReadContract(
    balanceOf,
    {
      contract,
      owner: account?.address || "",
    }
  );

  // Handle navigation based on wallet state
  useEffect(() => {
    // If wallet is disconnected, go back to landing page
    if (!account) {
      navigate("/");
      return;
    }

    // If wallet is connected and has SBT, redirect to members
    if (!isLoading && balance !== undefined && balance > 0n) {
      navigate("/members");
    }
  }, [account, balance, isLoading, navigate]);

  const handleLearnMore = () => {
    window.open("https://x.com/youthisboy", "_blank");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <EnhancedStarfield />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              opacity: [0.2, 0.8, 0.3, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Transparent Header with Wallet Connect */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-6 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10"
      >
        <motion.h1 
          className="text-xl md:text-2xl font-light text-white tracking-wider"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(168, 85, 247, 0.3)",
              "0 0 20px rgba(168, 85, 247, 0.5)", 
              "0 0 10px rgba(168, 85, 247, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Nads Central
        </motion.h1>
        <WalletConnect />
      </motion.header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          {/* Lock Icon with Pulse Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lock className="w-20 h-20 mx-auto text-white/40 drop-shadow-lg" />
            </motion.div>
          </motion.div>
          
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-8 leading-tight tracking-wide">
              Access to the cosmos
              <motion.span 
                className="block text-white/60 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                is denied
              </motion.span>
            </h2>
          </motion.div>

          {/* NGMI Sections */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-16 space-y-8"
          >
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div 
                className="glass p-6 rounded-2xl"
                whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-light text-white mb-3">Exclusive Access</h3>
                <p className="text-white/60 text-sm">Join the elite circle of cosmic explorers with verified membership.</p>
              </motion.div>

              <motion.div 
                className="glass p-6 rounded-2xl"
                whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.3)" }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary text-xl">🚀</span>
                </div>
                <h3 className="text-xl font-light text-white mb-3">Cosmic Rewards</h3>
                <p className="text-white/60 text-sm">Unlock premium features, quests, and leaderboard access.</p>
              </motion.div>

              <motion.div 
                className="glass p-6 rounded-2xl"
                whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.3)" }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-primary-glow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-glow text-xl">✨</span>
                </div>
                <h3 className="text-xl font-light text-white mb-3">Community Power</h3>
                <p className="text-white/60 text-sm">Connect with fellow Nads and shape the cosmic future.</p>
              </motion.div>
            </div>

            <motion.p 
              className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Without access, you're <span className="text-primary font-medium">NGMI</span> to the next level of cosmic exploration.
            </motion.p>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <CosmicButton
                size="lg"
                onClick={handleLearnMore}
                className="text-lg px-12 py-4 font-light shadow-2xl"
              >
                Acquire Cosmic Access
              </CosmicButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
