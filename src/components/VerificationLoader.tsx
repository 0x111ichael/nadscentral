import { motion } from "framer-motion";
import { Loader2, Shield, Sparkles } from "lucide-react";

interface VerificationLoaderProps {
  message?: string;
}

export function VerificationLoader({ message = "Verifying cosmic access..." }: VerificationLoaderProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative text-center"
      >
        {/* Spinning outer ring */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"></div>
          
          {/* Inner pulsing circle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -40, 20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: `${30 + i * 10}%`,
                top: `${40 + (i % 3) * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-light text-white">{message}</h3>
          
          <motion.div
            className="flex items-center justify-center space-x-2 text-white/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-light">Checking SBT ownership</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}