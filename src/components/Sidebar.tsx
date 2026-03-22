import { MAIN_MENU, CATEGORIES, CLASSES, EXTRA_MENU } from "../lib/constants";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

type SidebarProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function Sidebar({
  activeCategory,
  onSelectCategory,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isDesktop ? 0 : (isOpen ? 0 : -300) }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl md:flex",
          isOpen ? "flex" : "hidden md:flex",
        )}
      >
        <div className="flex h-16 items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
              <span className="text-lg font-mono">∑</span>
            </div>
            Math Engine
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div className="space-y-1">
            {MAIN_MENU.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectCategory(item.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-indigo-400" : "text-zinc-500",
                    )}
                  />
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">
              Classes
            </div>
            {CLASSES.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onSelectCategory(category.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-indigo-400" : "text-zinc-500",
                    )}
                  />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">
              Topics
            </div>
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onSelectCategory(category.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-indigo-400" : "text-zinc-500",
                    )}
                  />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">
              Extra
            </div>
            {EXTRA_MENU.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectCategory(item.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-indigo-400" : "text-zinc-500",
                    )}
                  />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
