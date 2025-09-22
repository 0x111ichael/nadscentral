import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc721";
import { client, monadTestnet, NADS_CONTRACT_ADDRESS } from "@/lib/thirdweb";
import { CosmicCard } from "./CosmicCard";
import { Zap, Globe, Rocket } from "lucide-react";

const contract = getContract({
  client,
  chain: monadTestnet,
  address: NADS_CONTRACT_ADDRESS,
});

export function MemberStats() {
  const account = useActiveAccount();
  
  const { data: balance } = useReadContract(
    balanceOf,
    {
      contract,
      owner: account?.address || "",
    }
  );

  const stats = [
    {
      icon: Zap,
      value: "∞",
      label: "Cosmic Power",
      color: "text-accent"
    },
    {
      icon: Globe,
      value: "Monad",
      label: "Home Chain",
      color: "text-secondary"
    },
    {
      icon: Rocket,
      value: "Active",
      label: "Explorer Status",
      color: "text-primary"
    }
  ];

  return (
    <>
      {stats.map((stat, index) => {
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