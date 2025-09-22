import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Newspaper, 
  BarChart3, 
  CheckSquare, 
  Trophy, 
  Menu,
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationItem {
  title: string;
  icon: typeof Home;
  id: string;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { title: "Dashboard", icon: Home, id: "dashboard" },
  { title: "Feed", icon: Newspaper, id: "feed" },
  { title: "Stats", icon: BarChart3, id: "stats" },
  { title: "Quest Board", icon: CheckSquare, id: "quests", badge: 3 },
  { title: "Leaderboard", icon: Trophy, id: "leaderboard" },
];

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
  isMobile?: boolean;
}

export function AppSidebar({ activeSection, onSectionChange, className, isMobile = false }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const textVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        isMobile 
          ? "relative h-full w-full flex flex-col" 
          : "fixed left-0 top-0 h-screen glass-strong border-r border-white/[0.15] z-40 flex flex-col",
        className
      )}
    >
      {/* Header - Hide collapse button on mobile */}
      {!isMobile && (
        <div className={cn(
          "flex items-center border-b border-white/10",
          isCollapsed ? "justify-center p-4" : "justify-between p-6"
        )}>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.h1
                variants={textVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-xl font-light text-gradient-cosmic"
              >
                Nads Central
              </motion.h1>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "touch-target glass rounded-lg hover:border-primary/20 transition-all duration-200 flex items-center justify-center w-10 h-10"
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 text-white" />
            ) : (
              <X className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <div className="p-6 border-b border-white/10">
          <h1 className="text-lg md:text-xl font-light text-gradient-cosmic">
            1M Nads Club
          </h1>
        </div>
      )}

      {/* Navigation */}
      <nav className={cn("flex-1", isCollapsed ? "p-2" : "px-4 py-6")}>
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center transition-all duration-200 group relative rounded-xl min-h-[48px]",
                  isCollapsed 
                    ? "justify-center p-3" 
                    : "justify-start px-4 py-3 text-left",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "hover:bg-white/5 text-white/70 hover:text-white border border-transparent hover:border-white/10"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isCollapsed ? "mx-auto" : "mr-3",
                  isActive ? "text-primary" : "group-hover:text-primary transition-colors"
                )} />
                
                <AnimatePresence mode="wait">
                  {(!isCollapsed || isMobile) && (
                    <motion.div
                      variants={textVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="flex items-center justify-between flex-1"
                    >
                      <span className="font-light text-sm">
                        {item.title}
                      </span>
                      
                      {/* Badge - only show when not collapsed */}
                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium ml-auto"
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={cn("border-t border-white/10", isCollapsed ? "p-2" : "px-4 py-4")}>
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "px-4"
        )}>
          <div className="w-8 h-8 bg-gradient-cosmic rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">N</span>
          </div>
          
          <AnimatePresence mode="wait">
            {(!isCollapsed || isMobile) && (
              <motion.div
                variants={textVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="ml-3 flex-1"
              >
                <div className="text-sm font-light text-white">Nad Score</div>
                <div className="text-xs text-primary font-light">1,337 pts</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}