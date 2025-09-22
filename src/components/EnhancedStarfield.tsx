import { motion } from "framer-motion";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

export function EnhancedStarfield() {
  // Optimize star generation with useMemo to prevent re-renders
  const stars = useMemo(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 100; i++) { // Reduced from 150 to 100 for performance
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5, // Smaller stars for better performance
        opacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 4 + 3, // Slower animations for smoother performance
      });
    }
    return newStars;
  }, []);

  return (
    <div className="starfield pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Subtle animated grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(255 255% 100% / 0.02) 1px, transparent 1px),
            linear-gradient(90deg, hsl(255 255% 100% / 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glowing animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 40%, transparent 70%)',
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.4), 0 0 ${star.size * 4}px rgba(255,255,255,0.2)`,
          }}
          animate={{
            opacity: [star.opacity * 0.4, star.opacity * 0.9, star.opacity * 0.4],
            scale: [0.8, 1.2, 0.8],
            boxShadow: [
              `0 0 ${star.size * 2}px rgba(255,255,255,0.4), 0 0 ${star.size * 4}px rgba(255,255,255,0.2)`,
              `0 0 ${star.size * 3}px rgba(255,255,255,0.6), 0 0 ${star.size * 6}px rgba(255,255,255,0.3)`,
              `0 0 ${star.size * 2}px rgba(255,255,255,0.4), 0 0 ${star.size * 4}px rgba(255,255,255,0.2)`
            ],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Simplified cosmic orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(270 91% 65% / 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}