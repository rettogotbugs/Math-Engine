import { Star } from "lucide-react";
import { MathTool } from "../lib/mathTools";
import { useAppStore } from "../lib/store";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

type ToolCardProps = {
  key?: string;
  tool: MathTool;
  onClick: () => void;
};

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const { favorites, toggleFavorite } = useAppStore();
  const isFavorite = favorites.includes(tool.id);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:border-indigo-500/50 hover:bg-zinc-800/80 hover:shadow-2xl hover:shadow-indigo-500/10"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {tool.category}
          </span>
          <h3 className="text-lg font-bold text-white">{tool.name}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(tool.id);
          }}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            isFavorite
              ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
              : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white",
          )}
        >
          <Star className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>
      </div>
      <p className="mt-4 text-sm text-zinc-400 line-clamp-2">
        {tool.description}
      </p>

      <div className="mt-6 flex items-center text-xs font-medium text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
        Open Tool →
      </div>
    </motion.div>
  );
}
