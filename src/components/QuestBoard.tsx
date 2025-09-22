import { CosmicCard } from "./CosmicCard";
import { CosmicButton } from "./CosmicButton";
import { CheckSquare, Clock, Zap, Users, MessageCircle, Vote } from "lucide-react";
import { motion } from "framer-motion";

interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: typeof CheckSquare;
  status: "available" | "in-progress" | "completed";
  timeLeft?: string;
  progress?: { current: number; total: number };
}

const quests: Quest[] = [
  {
    id: "twitter-connect",
    title: "Connect Your Twitter",
    description: "Link your Twitter account to showcase your cosmic identity",
    points: 50,
    icon: MessageCircle,
    status: "available"
  },
  {
    id: "community-vote",
    title: "Vote on Weekly Poll",
    description: "Participate in this week's community governance decision",
    points: 75,
    icon: Vote,
    status: "available",
    timeLeft: "3 days left"
  },
  {
    id: "daily-checkin",
    title: "Daily Check-in",
    description: "Visit the dashboard every day this week",
    points: 25,
    icon: CheckSquare,
    status: "in-progress",
    progress: { current: 4, total: 7 }
  },
  {
    id: "invite-friends",
    title: "Invite Cosmic Explorers",
    description: "Share the gateway with 3 potential members",
    points: 150,
    icon: Users,
    status: "available"
  },
  {
    id: "monad-transaction",
    title: "Make Your First Transaction",
    description: "Complete a transaction on the Monad network",
    points: 100,
    icon: Zap,
    status: "completed"
  }
];

export function QuestBoard() {
  const getStatusColor = (status: Quest["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400 border-green-400/30 bg-green-400/10";
      case "in-progress":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      default:
        return "text-primary border-primary/30 bg-primary/10";
    }
  };

  const getStatusText = (status: Quest["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "Available";
    }
  };

  const handleQuestAction = (quest: Quest) => {
    // Quest action logic would go here
    console.log("Quest action:", quest.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-light text-gradient-cosmic">Quest Board</h2>
        <div className="text-left sm:text-right">
          <div className="text-sm text-muted-foreground">Weekly Quests</div>
          <div className="text-lg font-light text-white">3 of 5 Active</div>
        </div>
      </div>

      {/* Quest Grid */}
      <div className="grid gap-4">
        {quests.map((quest, index) => {
          const Icon = quest.icon;
          
          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CosmicCard className="p-4 md:p-6 hover:border-primary/20 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Icon */}
                  <div className={`p-2 md:p-3 rounded-xl flex-shrink-0 ${getStatusColor(quest.status)}`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                      <h3 className="text-lg font-light text-white">{quest.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-light">+{quest.points}</span>
                        <span className="text-sm text-muted-foreground">pts</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {quest.description}
                    </p>

                    {/* Progress or Time Left */}
                    {quest.progress && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-white">{quest.progress.current}/{quest.progress.total}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-cosmic h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(quest.progress.current / quest.progress.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {quest.timeLeft && (
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-yellow-400">{quest.timeLeft}</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(quest.status)}`}>
                        {getStatusText(quest.status)}
                      </span>
                      
                      {quest.status !== "completed" && (
                        <CosmicButton
                          size="sm"
                          variant={quest.status === "in-progress" ? "outline" : "cosmic"}
                          onClick={() => handleQuestAction(quest)}
                          className="w-full sm:w-auto"
                        >
                          {quest.status === "in-progress" ? "Continue" : "Start"}
                        </CosmicButton>
                      )}
                    </div>
                  </div>
                </div>
              </CosmicCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}