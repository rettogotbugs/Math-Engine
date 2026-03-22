import { Star, Calculator, FunctionSquare, Shapes, Triangle, Ruler, Activity, LayoutGrid, Wrench } from "lucide-react";
import { MathTool } from "../lib/mathTools";
import { useAppStore } from "../lib/store";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

type ToolCardProps = {
  key?: string;
  tool: MathTool;
  onClick: () => void;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "basic_math":
      return Calculator;
    case "algebra":
      return FunctionSquare;
    case "geometry":
      return Shapes;
    case "trigonometry":
      return Triangle;
    case "mensuration":
      return Ruler;
    case "calculus":
      return Activity;
    case "coordinate_geometry":
      return LayoutGrid;
    case "advanced_math":
      return FunctionSquare;
    case "utility":
      return Wrench;
    default:
      return Calculator;
  }
};

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const { favorites, toggleFavorite } = useAppStore();
  const isFavorite = favorites.includes(tool.id);
  const Icon = getCategoryIcon(tool.category);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:border-indigo-500/50 hover:bg-zinc-800/80 hover:shadow-2xl hover:shadow-indigo-500/10"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
              {tool.category.replace("_", " ")}
            </span>
            <h3 className="text-base font-bold text-white leading-tight">{tool.name}</h3>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(tool.id);
          }}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
            isFavorite
              ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
              : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white",
          )}
        >
          <Star className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>
      </div>
      <p className="mt-4 text-sm text-zinc-400 line-clamp-1">
        {tool.description}
      </p>

      <div className="mt-5 flex items-center text-xs font-medium text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
        Open Tool →
      </div>
    </motion.div>
  );
}
