import { useUserStats } from "@/hooks/use-user-stats";
import { useQuestInteractions } from "@/hooks/use-quest-interactions";
import { useUserProfileContext } from "@/contexts/UserProfileContext";
import { motion } from "framer-motion";
import { CosmicCard } from "./CosmicCard";
import { CosmicButton } from "./CosmicButton";
import { Award, Zap, Users, Activity, Star, Calendar, Globe, TrendingUp } from "lucide-react";
// ...existing code...

export function Dashboard() {
  const { profile } = useUserProfileContext();
  const { data: stats, isLoading: statsLoading } = useUserStats();
  const { data: questInteractions, isLoading: questLoading } = useQuestInteractions();

  const dashboardStats = [
    {
      icon: Zap,
      value: stats?.current_points?.toLocaleString() || "0",
      label: "Nad Score",
      change: `+${stats?.daily_points || 0} today`,
      color: "text-primary"
    },
    {
      icon: Award,
      value: questInteractions?.length?.toString() || "0",
      label: "Quests Completed",
      change: `+${questInteractions?.filter(q => q.interaction_type === 'completed').length || 0} this week`,
      color: "text-secondary"
    },
    {
      icon: Users,
      value: "#--",
      label: "Leaderboard Rank",
      change: "--",
      color: "text-accent"
    },
    {
      icon: Activity,
      value: stats?.current_streak?.toString() || "0",
      label: "Day Streak",
      change: `Longest: ${stats?.longest_streak || 0}`,
      color: "text-green-400"
    }
  ];

  const recentActivity = questInteractions?.slice(0, 5).map(q => ({
    type: q.interaction_type,
    title: `Quest #${q.quest_id}`,
    time: new Date(q.completed_at).toLocaleString(),
    points: q.points_earned,
    icon: Star // You can map to different icons based on type
  })) || [];

  if (statsLoading || questLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-light text-gradient-cosmic mb-4"
          >
            Welcome back, Cosmic Explorer
          </motion.h1>
          <p className="text-muted-foreground text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // ...existing UI rendering code for dashboardStats, recentActivity, etc...
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-light text-gradient-cosmic mb-4"
        >
          Welcome back, Cosmic Explorer
        </motion.h1>
        <p className="text-muted-foreground text-lg">
          Continue your journey through the Monad nebula
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CosmicCard className="p-6 text-center hover:border-primary/20 transition-all duration-300">
                <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-light text-white mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="text-xs text-green-400">{stat.change}</div>
              </CosmicCard>
            </motion.div>
          );
        })}
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <CosmicCard className="p-6">
          <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-light text-white">{activity.title}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  <div className="text-primary font-light">+{activity.points}</div>
                </div>
              );
            })}
          </div>
        </CosmicCard>
        {/* Upcoming Quests */}
        <CosmicCard className="p-6">
          <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-secondary" />
            Upcoming Quests
          </h3>
          <div className="space-y-4">
            {/* TODO: Replace with real upcoming quests if available */}
            <div className="p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-light text-white">Vote on Community Proposal</h4>
                <span className="text-sm text-primary font-light">+75</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">2 days left</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-400/20 text-green-400">Easy</span>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-light text-white">Invite 3 Cosmic Explorers</h4>
                <span className="text-sm text-primary font-light">+150</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">5 days left</span>
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-400/20 text-yellow-400">Medium</span>
              </div>
            </div>
            <CosmicButton variant="outline" className="w-full">
              View All Quests
            </CosmicButton>
          </div>
        </CosmicCard>
      </div>
      {/* Quick Actions */}
      <CosmicCard className="p-6">
        <h3 className="text-xl font-light text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <CosmicButton variant="outline" className="h-24 flex-col">
            <Star className="w-6 h-6 mb-2" />
            Daily Check-in
          </CosmicButton>
          <CosmicButton variant="outline" className="h-24 flex-col">
            <Users className="w-6 h-6 mb-2" />
            Invite Friends
          </CosmicButton>
          <CosmicButton variant="outline" className="h-24 flex-col">
            <Globe className="w-6 h-6 mb-2" />
            Connect Social
          </CosmicButton>
          <CosmicButton variant="outline" className="h-24 flex-col">
            <TrendingUp className="w-6 h-6 mb-2" />
            View Progress
          </CosmicButton>
        </div>
      </CosmicCard>
    </div>
  );
}