import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CosmicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CosmicCard = forwardRef<HTMLDivElement, CosmicCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "card-cosmic p-8 md:p-10 glass border border-border/60 backdrop-blur-lg transition-all duration-300 hover:border-primary/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CosmicCard.displayName = "CosmicCard";

export { CosmicCard };