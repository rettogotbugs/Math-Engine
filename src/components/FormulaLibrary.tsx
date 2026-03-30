import { useState, useMemo } from "react";
import { Search, BookOpen, Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { cn } from "../lib/utils";
import { formulas } from "../lib/formulas";

export function FormulaLibrary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(formulas.map((f) => f.category)))];

  const filteredFormulas = useMemo(() => {
    const filtered = formulas.filter(
      (item) =>
        (activeCategory === "All" || item.category === activeCategory) &&
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.formula.toLowerCase().includes(search.toLowerCase()))
    );

    const grouped = filtered.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof formulas>);

    return Object.entries(grouped).map(([category, items]) => ({
      category,
      items,
    }));
  }, [search, activeCategory]);

  const handleCopy = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-indigo-400" />
          Formula Library
        </h1>
        <p className="mt-2 text-zinc-400">
          Browse and search essential mathematical formulas
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search formulas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-12">
        {filteredFormulas.map((category) => (
          <div key={category.category}>
            <h2 className="mb-6 text-2xl font-bold text-white border-b border-white/10 pb-2">
              {category.category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-col rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl hover:border-indigo-500/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.name}
                  </h3>
                  <div className="rounded-xl bg-indigo-500/10 p-4 mb-4 border border-indigo-500/20 flex-1 flex items-center justify-center overflow-x-auto">
                    <div className="text-indigo-400">
                      <BlockMath math={item.formula} />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleCopy(item.formula)}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
                  >
                    {copiedFormula === item.formula ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-zinc-400" />
                        <span>Use this formula</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {filteredFormulas.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-lg">No formulas found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
