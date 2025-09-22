import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc721";
import { client, monadTestnet, NADS_CONTRACT_ADDRESS } from "@/lib/thirdweb";
import { EnhancedStarfield } from "@/components/EnhancedStarfield";
import { WalletConnect } from "@/components/WalletConnect";
import { MemberStats } from "@/components/MemberStats";
import { MemberFeed } from "@/components/MemberFeed";
import { QuestBoard } from "@/components/QuestBoard";
import { Leaderboard } from "@/components/Leaderboard";
import { Dashboard } from "@/components/Dashboard";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNav } from "@/components/MobileNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const contract = getContract({
  client,
  chain: monadTestnet,
  address: NADS_CONTRACT_ADDRESS,
});

export default function Members() {
  const account = useActiveAccount();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const isMobile = useIsMobile();

  const { data: balance, isLoading, error } = useReadContract(
    balanceOf,
    {
      contract,
      owner: account?.address || "",
    }
  );

  useEffect(() => {
    if (!account) {
      navigate("/");
      return;
    }

    if (!isLoading && balance !== undefined && balance === 0n) {
      navigate("/locked");
    }
  }, [account, balance, isLoading, navigate]);

  if (!account) {
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "feed":
        return <MemberFeed />;
      case "stats":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MemberStats />
          </div>
        );
      case "quests":
        return <QuestBoard />;
      case "leaderboard":
        return <Leaderboard />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-black">
        <EnhancedStarfield />
        <div className="flex relative">
          {/* Mobile Navigation Loading */}
          {isMobile && (
            <header className="fixed top-0 left-0 right-0 z-50 glass-strong h-16 flex items-center justify-between px-4 animate-pulse">
              <div className="w-8 h-8 bg-white/10 rounded-lg" />
              <div className="h-5 w-24 bg-white/10 rounded" />
              <div className="w-8 h-8 bg-white/10 rounded-lg" />
            </header>
          )}
          
          {/* Desktop Sidebar Loading */}
          {!isMobile && (
            <div className="w-80 h-screen glass-strong border-r border-white/[0.15] animate-pulse">
              <div className="p-6 space-y-4">
                <div className="h-6 w-32 bg-white/10 rounded" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 w-full bg-white/5 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className={cn(
            "flex-1 p-4 md:p-8",
            isMobile ? "mt-16 w-full" : "ml-0"
          )}>
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="h-12 w-64 bg-white/10 rounded animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="glass rounded-xl p-6 animate-pulse">
                    <div className="h-8 w-8 bg-white/10 rounded mb-3" />
                    <div className="h-6 w-16 bg-white/10 rounded mb-2" />
                    <div className="h-4 w-20 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center">
        <EnhancedStarfield />
        <div className="relative z-10 text-center">
          <p className="text-xl text-red-500">Error loading member data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      <EnhancedStarfield />
      
      <div className="flex relative">
        {/* Mobile Navigation */}
        {isMobile && (
          <MobileNav 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <AppSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        )}
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 min-h-screen",
          isMobile ? "w-full" : "ml-80"
        )}>
          {/* Transparent Header */}
          <header className={cn(
            "relative z-10 flex justify-between items-center px-8 py-6 border-b border-white/10 bg-black/20 backdrop-blur-sm",
            isMobile ? "mt-16" : ""
          )}>
            <h1 className="text-xl font-light text-gradient-cosmic">
              Cosmic Dashboard
            </h1>
            <WalletConnect />
          </header>
          
          {/* Content Area - Centered with equal margins */}
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex-1 px-8 py-8">
              <div className="max-w-6xl mx-auto w-full">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}