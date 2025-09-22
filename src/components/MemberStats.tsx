import { CosmicCard } from "./CosmicCard";
import { Zap, Globe, Rocket } from "lucide-react";
import { useUserStats } from "@/hooks/use-user-stats";

export function MemberStats() {
  const { data: stats, isLoading } = useUserStats();

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading stats...</div>;
  }

  if (!stats) {
    return <div className="text-center text-muted-foreground">No stats found.</div>;
  }

  const statCards = [
    {
      icon: Zap,
      value: stats.current_points?.toLocaleString() ?? "0",
      label: "Nad Points",
      color: "text-accent"
    },
    {
      icon: Globe,
      value: stats.current_streak?.toString() ?? "0",
      label: "Current Streak",
      color: "text-secondary"
    },
    {
      icon: Rocket,
      value: stats.longest_streak?.toString() ?? "0",
      label: "Longest Streak",
      color: "text-primary"
    }
  ];

  return (
    <>
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <CosmicCard key={index} className="text-center group p-4 md:p-6">
            <div className="flex flex-col items-center justify-center mb-2">
              <Icon className={`w-6 h-6 md:w-8 md:h-8 mb-3 ${stat.color} group-hover:scale-105 transition-transform duration-200`} />
              <h3 className="text-xl md:text-2xl font-light text-gradient-cosmic mb-1 tracking-wide">
                {stat.value}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base font-light">{stat.label}</p>
            </div>
          </CosmicCard>
        );
      })}
    </>
  );
}