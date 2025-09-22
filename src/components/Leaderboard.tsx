import { CosmicCard } from "./CosmicCard";
import { Trophy, Medal, Award, Crown, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  rank: number;
  address: string;
  displayName: string;
  nadScore: number;
  weeklyGain: number;
  avatar?: string;
  badge?: "founder" | "og" | "active";
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    address: "0x1234...5678",
    displayName: "CosmicExplorer",
    nadScore: 4250,
    weeklyGain: 325,
    badge: "founder"
  },
  {
    rank: 2,
    address: "0x2345...6789",
    displayName: "MonadMaster",
    nadScore: 3875,
    weeklyGain: 280,
    badge: "og"
  },
  {
    rank: 3,
    address: "0x3456...7890",
    displayName: "QuantumNad",
    nadScore: 3420,
    weeklyGain: 195,
    badge: "active"
  },
  {
    rank: 4,
    address: "0x4567...8901",
    displayName: "DegenSage",
    nadScore: 3100,
    weeklyGain: 150
  },
  {
    rank: 5,
    address: "0x5678...9012",
    displayName: "CryptoVoyager",
    nadScore: 2950,
    weeklyGain: 220
  },
  {
    rank: 6,
    address: "0x6789...0123",
    displayName: "BlockchainNinja",
    nadScore: 2780,
    weeklyGain: 89
  },
  {
    rank: 7,
    address: "0x7890...1234",
    displayName: "NebulaDiver",
    nadScore: 2650,
    weeklyGain: 175
  },
  {
    rank: 8,
    address: "0x8901...2345",
    displayName: "StarForger",
    nadScore: 2440,
    weeklyGain: 130
  }
];

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "founder":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black";
      case "og":
        return "bg-gradient-to-r from-purple-400 to-purple-600 text-white";
      case "active":
        return "bg-gradient-to-r from-green-400 to-green-600 text-white";
      default:
        return "";
    }
  };

  const getBadgeText = (badge?: string) => {
    switch (badge) {
      case "founder":
        return "Founder";
      case "og":
        return "OG";
      case "active":
        return "Active";
      default:
        return "";
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank <= 3) {
      return "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30";
    }
    return "bg-white/5 border-white/10";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-light text-gradient-cosmic">Leaderboard</h2>
        <div className="text-left sm:text-right">
          <div className="text-sm text-muted-foreground">Season 1</div>
          <div className="text-lg font-light text-white">Week 4</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <CosmicCard className="p-4 text-center">
          <Trophy className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
          <div className="text-xl md:text-2xl font-light text-white">125</div>
          <div className="text-sm text-muted-foreground">Active Members</div>
        </CosmicCard>
        
        <CosmicCard className="p-4 text-center">
          <Zap className="w-6 h-6 md:w-8 md:h-8 text-secondary mx-auto mb-2" />
          <div className="text-xl md:text-2xl font-light text-white">47.2K</div>
          <div className="text-sm text-muted-foreground">Total Points</div>
        </CosmicCard>
        
        <CosmicCard className="p-4 text-center">
          <Award className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-2" />
          <div className="text-xl md:text-2xl font-light text-white">892</div>
          <div className="text-sm text-muted-foreground">Quests Completed</div>
        </CosmicCard>
      </div>

      {/* Leaderboard Table */}
      <CosmicCard className="overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-light text-white mb-4">Top Cosmic Explorers</h3>
          
          <div className="space-y-3">
            {leaderboardData.map((entry, index) => (
              <motion.div
                key={entry.address}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border transition-all duration-200 hover:border-primary/20 ${getRankStyle(entry.rank)}`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12">
                  {getRankIcon(entry.rank)}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-cosmic rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {entry.displayName.charAt(0)}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <span className="font-light text-white truncate">{entry.displayName}</span>
                    {entry.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${getBadgeColor(entry.badge)}`}>
                        {getBadgeText(entry.badge)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-mono truncate">
                    {entry.address}
                  </div>
                </div>

                {/* Score */}
                <div className="text-right flex-shrink-0">
                  <div className="text-lg md:text-xl font-light text-primary">
                    {entry.nadScore.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-green-400">
                    +{entry.weeklyGain} this week
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CosmicCard>

      {/* Your Rank Card */}
      <CosmicCard className="p-4 md:p-6 border-primary/30 glass">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-cosmic rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-white text-sm md:text-base">Y</span>
            </div>
            <div>
              <div className="font-semibold text-white">Your Position</div>
              <div className="text-sm text-muted-foreground">Rank #42 of 125</div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xl md:text-2xl font-light text-primary">1,337</div>
            <div className="text-sm text-green-400">+87 this week</div>
          </div>
        </div>
      </CosmicCard>
    </div>
  );
}