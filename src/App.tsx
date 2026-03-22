import { useState, useMemo } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { ToolCard } from "./components/ToolCard";
import { ToolView } from "./components/ToolView";
import { ExpressionEvaluator } from "./components/ExpressionEvaluator";
import { FormulaLibrary } from "./components/FormulaLibrary";
import { GraphViewer } from "./components/GraphViewer";
import { UniversalInput } from "./components/UniversalInput";
import { HomeView } from "./components/HomeView";
import { mathTools } from "./lib/mathTools";
import { useAppStore } from "./lib/store";
import { motion, AnimatePresence } from "motion/react";
import { Search, ArrowUpDown } from "lucide-react";
import { CATEGORIES } from "./lib/constants";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("home");
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"a-z" | "popular">("popular");

  const { favorites, history } = useAppStore();

  const selectedTool = selectedToolId
    ? mathTools.find((t) => t.id === selectedToolId)
    : null;

  const getFilteredTools = () => {
    let tools = mathTools;
    
    if (activeCategory === "favorites") {
      tools = mathTools.filter((t) => favorites.includes(t.id));
    } else if (activeCategory === "recent") {
      const recentIds = Array.from(new Set(history.map((h) => h.toolId))).slice(
        0,
        10,
      );
      tools = recentIds
        .map((id) => mathTools.find((t) => t.id === id)!)
        .filter(Boolean);
    } else if (activeCategory !== "all") {
      tools = mathTools.filter((t) => t.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === "a-z") {
      tools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "popular") {
      // For now, just a dummy popular sort (could be based on history count)
      // We'll just reverse it or keep it as is for "popular"
      // Or sort by favorites count if we had global favorites.
      // For now, let's just leave it as default order for popular, or sort by id.
      tools = [...tools].sort((a, b) => {
        const aPop = history.filter(h => h.toolId === a.id).length;
        const bPop = history.filter(h => h.toolId === b.id).length;
        if (aPop !== bPop) return bPop - aPop;
        return 0;
      });
    }

    return tools;
  };

  const filteredTools = getFilteredTools();

  // Handle category change and reset search
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSelectedToolId(null);
    setSearchQuery("");
  };

  const currentCategoryObj = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-50 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="absolute -top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden relative md:pl-64">
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
          onSelectTool={(id) => setSelectedToolId(id)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
            <AnimatePresence mode="wait">
              {activeCategory === "home" && !selectedTool ? (
                <motion.div
                  key="home-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <HomeView 
                    onSelectTool={(id) => setSelectedToolId(id)} 
                    onSelectCategory={handleCategoryChange} 
                  />
                </motion.div>
              ) : activeCategory === "Formulas" ? (
                <motion.div
                  key="formula-library"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <FormulaLibrary />
                </motion.div>
              ) : activeCategory === "Graphs" ? (
                <motion.div
                  key="graph-viewer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GraphViewer />
                </motion.div>
              ) : selectedTool ? (
                <ToolView
                  key="tool-view"
                  tool={selectedTool}
                  onBack={() => setSelectedToolId(null)}
                  onSelectTool={(id) => setSelectedToolId(id)}
                />
              ) : (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mx-auto max-w-6xl"
                >
                  <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl flex items-center gap-3">
                        {currentCategoryObj?.icon && <currentCategoryObj.icon className="h-8 w-8 text-indigo-400" />}
                        {activeCategory === "favorites"
                          ? "Favorite Tools"
                          : activeCategory === "recent"
                            ? "Recently Used"
                            : activeCategory === "all"
                              ? "All Tools"
                              : currentCategoryObj?.name || activeCategory}
                      </h1>
                      <div className="mt-2 flex items-center gap-3 text-zinc-400">
                        <p>
                          {activeCategory === "favorites"
                            ? "Your starred mathematical tools"
                            : activeCategory === "recent"
                              ? "Tools you have used recently"
                              : activeCategory === "all"
                                ? "Browse and search all available mathematical tools"
                                : `Explore ${currentCategoryObj?.name || activeCategory} tools and calculators`}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white">
                          {filteredTools.length} tools
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                      {activeCategory === "all" && (
                        <div className="relative w-full sm:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="Search tools, topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-900/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      )}
                      <div className="relative w-full sm:w-auto">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as "a-z" | "popular")}
                          className="w-full appearance-none rounded-xl border border-white/10 bg-zinc-900/50 py-2.5 pl-10 pr-8 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="popular">Popular</option>
                          <option value="a-z">A-Z</option>
                        </select>
                        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      </div>
                    </div>
                  </div>

                  {filteredTools.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredTools.map((tool) => (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                          onClick={() => setSelectedToolId(tool.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 text-center text-zinc-500 backdrop-blur-sm">
                      <p className="text-lg font-medium">No tools found</p>
                      <p className="mt-1 text-sm">
                        {searchQuery 
                          ? `No results for "${searchQuery}"`
                          : activeCategory === "favorites"
                          ? "Star tools to see them here"
                          : activeCategory === "recent"
                            ? "Use some tools to see them here"
                            : activeCategory === "all"
                              ? "No tools available"
                              : "Check back later for more tools"}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

      <ExpressionEvaluator />
    </div>
  );
}
