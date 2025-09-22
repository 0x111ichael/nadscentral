import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    closeSidebar();
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong h-16 flex items-center justify-between px-4">
        <button
          onClick={toggleSidebar}
          className="touch-target glass rounded-lg hover:border-primary/20 transition-all duration-200"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
        
        <h1 className="text-lg font-semibold text-gradient-cosmic">
          1M Nads Club
        </h1>
        
        <div className="w-11" /> {/* Spacer for centering */}
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw]"
          >
            <div className="glass-strong h-full border-r border-white/[0.15]">
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={closeSidebar}
                  className="touch-target glass rounded-lg hover:border-primary/20 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Sidebar Content */}
              <AppSidebar
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                className="border-none bg-transparent"
                isMobile={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}