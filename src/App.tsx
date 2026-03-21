import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { ToolCard } from "./components/ToolCard";
import { ToolView } from "./components/ToolView";
import { ExpressionEvaluator } from "./components/ExpressionEvaluator";
import { FormulaLibrary } from "./components/FormulaLibrary";
import { GraphViewer } from "./components/GraphViewer";
import { UniversalInput } from "./components/UniversalInput";
import { mathTools } from "./lib/mathTools";
import { useAppStore } from "./lib/store";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { favorites, history } = useAppStore();

  const selectedTool = selectedToolId
    ? mathTools.find((t) => t.id === selectedToolId)
    : null;

  const getFilteredTools = () => {
    if (activeCategory === "favorites") {
      return mathTools.filter((t) => favorites.includes(t.id));
    }
    if (activeCategory === "recent") {
      const recentIds = Array.from(new Set(history.map((h) => h.toolId))).slice(
        0,
        10,
      );
      return recentIds
        .map((id) => mathTools.find((t) => t.id === id)!)
        .filter(Boolean);
    }
    if (activeCategory === "popular") {
      // For now, return a static list of popular tools
      const popularIds = ["linear_eq", "quad_eq", "derivative", "integral", "matrix_ops", "basic_trig", "area_circle", "lcm_hcf"];
      return popularIds
        .map((id) => mathTools.find((t) => t.id === id)!)
        .filter(Boolean);
    }
    if (activeCategory === "all") {
      return mathTools;
    }
    return mathTools.filter((t) => t.category === activeCategory);
  };

  const filteredTools = getFilteredTools();
  console.log("Total tools loaded:", mathTools.length);
  console.log("Filtered tools:", filteredTools.length);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-50 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="absolute -top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="z-10 flex h-full w-full">
        <Sidebar
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSelectedToolId(null);
          }}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        <div className="flex flex-1 flex-col overflow-hidden relative">
          <Topbar
            onMenuClick={() => setIsSidebarOpen(true)}
            onSelectTool={(id) => setSelectedToolId(id)}
          />

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <AnimatePresence mode="wait">
              {activeCategory === "Formulas" ? (
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
                />
              ) : (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mx-auto max-w-6xl"
                >
                  {activeCategory !== "favorites" &&
                    activeCategory !== "recent" &&
                    activeCategory !== "popular" &&
                    activeCategory !== "all" && <UniversalInput />}

                  <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                      {activeCategory === "favorites"
                        ? "Favorite Tools"
                        : activeCategory === "recent"
                          ? "Recently Used"
                          : activeCategory === "popular"
                            ? "Popular Tools"
                            : activeCategory === "all"
                              ? "All Tools"
                              : activeCategory}
                    </h1>
                    <p className="mt-2 text-zinc-400">
                      {activeCategory === "favorites"
                        ? "Your starred mathematical tools"
                        : activeCategory === "recent"
                          ? "Tools you have used recently"
                          : activeCategory === "popular"
                            ? "Most frequently used tools by everyone"
                            : activeCategory === "all"
                              ? "Browse all available mathematical tools"
                              : `Explore ${activeCategory.toLowerCase()} tools and calculators`}
                    </p>
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
                        {activeCategory === "favorites"
                          ? "Star tools to see them here"
                          : activeCategory === "recent"
                            ? "Use some tools to see them here"
                            : activeCategory === "popular"
                              ? "No popular tools found"
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
      </div>

      <ExpressionEvaluator />
    </div>
  );
}
