import { CosmicCard } from "./CosmicCard";
import { CosmicButton } from "./CosmicButton";
import { Calendar, MessageCircle, Users, ExternalLink, Bell, Star } from "lucide-react";

export function MemberFeed() {
  const activities = [
    {
      type: "announcement",
      icon: Bell,
      title: "Monad Devnet 2.0 Launch",
      content: "The next phase of Monad testing is here. New features and improved performance await.",
      time: "2 hours ago",
      accent: "primary"
    },
    {
      type: "community",
      icon: Users,
      title: "Weekly Community Call",
      content: "Join us every Thursday at 3 PM UTC for updates and community discussions.",
      time: "1 day ago",
      accent: "secondary"
    },
    {
      type: "milestone",
      icon: Star,
      title: "1M Transactions Milestone",
      content: "The Monad testnet has successfully processed over 1 million transactions!",
      time: "3 days ago",
      accent: "accent"
    },
    {
      type: "event",
      icon: Calendar,
      title: "Hackathon Announcement",
      content: "Build the future on Monad. Registration opens soon for our global hackathon.",
      time: "1 week ago",
      accent: "primary"
    }
  ];

  return (
    <CosmicCard className="mb-10 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <h3 className="text-xl md:text-2xl font-light text-gradient-cosmic tracking-wide">
          Cosmic Feed
        </h3>
        <CosmicButton variant="ghost" size="sm" className="!px-4 !py-2 self-start sm:self-auto">
          <MessageCircle className="w-4 h-4 mr-2" />
          Join Discord
        </CosmicButton>
      </div>

      <div className="space-y-4 md:space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className="group p-4 md:p-5 rounded-xl glass hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-3 md:gap-5">
                <div className={`p-2 md:p-3 rounded-xl glass border-${activity.accent}/20`}>
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 text-${activity.accent}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                    <h4 className="font-light text-foreground group-hover:text-gradient-cosmic transition-all duration-300 text-base md:text-lg truncate">
                      {activity.title}
                    </h4>
                    <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">
                    {activity.content}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
              </div>
            </div>
          );
        })}
      </div>
    </CosmicCard>
  );
}