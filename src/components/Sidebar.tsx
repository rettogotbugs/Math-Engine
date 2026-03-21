import { CATEGORIES } from "../lib/constants";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

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
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl md:static md:flex",
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
            {CATEGORIES.slice(0, 4).map((category) => {
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
              Library
            </div>
            {CATEGORIES.slice(4, -2).map((category) => {
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
              Explore
            </div>
            {CATEGORIES.slice(-2).map((category) => {
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
        </div>
      </motion.aside>
    </>
  );
}
