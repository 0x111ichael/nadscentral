import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CosmicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cosmic" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const CosmicButton = forwardRef<HTMLButtonElement, CosmicButtonProps>(
  ({ className, variant = "cosmic", size = "md", children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden font-light transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:pointer-events-none touch-target";

    const variants = {
      cosmic: "btn-cosmic",
      outline: "btn-cosmic-outline",
      ghost: "bg-transparent text-foreground hover:bg-white/5 hover:text-foreground border border-transparent glass hover:border-primary/20",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-8 py-4 text-base rounded-lg",
      lg: "px-12 py-6 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CosmicButton.displayName = "CosmicButton";

export { CosmicButton };