import { ArrowLeft, Copy, Check, Star, RefreshCw, Play, AlertCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { MathTool, ToolResult, mathTools } from "../lib/mathTools";
import { useAppStore } from "../lib/store";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { ToolCard } from "./ToolCard";

type ToolViewProps = {
  key?: string;
  tool: MathTool;
  onBack: () => void;
  onSelectTool: (id: string) => void;
};

export function ToolView({ tool, onBack, onSelectTool }: ToolViewProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ToolResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"solve" | "steps" | "formula">("solve");
  const { favorites, toggleFavorite, addHistory } = useAppStore();

  const isFavorite = favorites.includes(tool.id);

  const relatedTools = mathTools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  const handleCalculate = async () => {
    setError(null);
    
    // Basic validation
    for (const input of tool.inputs) {
      if (!inputs[input.id] && input.type !== "select") {
        setError(`Please fill in all required fields (${input.label})`);
        return;
      }
    }

    setIsCalculating(true);
    
    // Simulate slight delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    try {
      const res = tool.calculate(inputs);
      
      if (res.result.toString().toLowerCase().includes("error") || res.result.toString().toLowerCase().includes("invalid")) {
        setError(res.result.toString());
        setResult(null);
      } else {
        setResult(res);
        setActiveTab("solve");
        addHistory({
          toolId: tool.id,
          toolName: tool.name,
          inputs,
          result: String(res.result),
        });
      }
    } catch (err) {
      setError("An error occurred during calculation. Please check your inputs.");
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleClear = () => {
    setInputs({});
    setResult(null);
    setError(null);
  };

  const handleExample = () => {
    const exampleInputs: Record<string, string> = {};
    tool.inputs.forEach((input) => {
      if (input.type === "select" && input.options?.length) {
        exampleInputs[input.id] = input.options[0].value;
      } else if (input.placeholder) {
        // Extract a number or use a default string from placeholder
        const match = input.placeholder.match(/e\.g\.,?\s*(.+)/i);
        exampleInputs[input.id] = match ? match[1] : "5";
      } else {
        exampleInputs[input.id] = "5";
      }
    });
    setInputs(exampleInputs);
    setError(null);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(String(result.result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-5xl p-2 md:p-6"
    >
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
        <button onClick={onBack} className="hover:text-white transition-colors">Home</button>
        <ChevronRight className="h-4 w-4" />
        <span className="capitalize">{tool.category.replace("_", " ")}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-indigo-400 font-medium">{tool.name}</span>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </button>
        <button
          onClick={() => toggleFavorite(tool.id)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            isFavorite
              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white",
          )}
        >
          <Star className={cn("h-4 w-4", isFavorite && "fill-current")} />
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {tool.name}
        </h1>
        <p className="mt-3 text-lg text-zinc-400 max-w-2xl leading-relaxed">{tool.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 mb-16">
        {/* Input Section */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Inputs</h2>
            <div className="flex gap-2">
              <button
                onClick={handleExample}
                className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Play className="h-3 w-3" />
                Example
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RefreshCw className="h-3 w-3" />
                Clear
              </button>
            </div>
          </div>
          
          <div className="space-y-5 flex-1">
            {tool.inputs.map((input) => (
              <div key={input.id} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">
                  {input.label}
                </label>
                {input.type === "select" ? (
                  <select
                    value={inputs[input.id] || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, [input.id]: e.target.value })
                    }
                    className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {input.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={input.type === "number" ? "text" : "text"}
                    placeholder={input.placeholder}
                    value={inputs[input.id] || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, [input.id]: e.target.value })
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                    className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-start gap-3 rounded-xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </motion.div>
          )}

          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="mt-8 w-full rounded-xl bg-indigo-600 px-4 py-4 font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            {isCalculating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Calculating...
              </>
            ) : (
              "Solve Problem"
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl">
          {/* Tabs */}
          <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab("solve")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "solve"
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              Result
            </button>
            <button
              onClick={() => setActiveTab("steps")}
              disabled={!result?.steps?.length}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                activeTab === "steps"
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              Steps
            </button>
            <button
              onClick={() => setActiveTab("formula")}
              disabled={!result?.formula}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                activeTab === "formula"
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              Formula
            </button>
          </div>

          {result ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6 flex-1"
              >
                {activeTab === "solve" && (
                  <div className="relative rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-8">
                    <div className="text-3xl font-bold text-white break-words pr-10">
                      {result.result}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="absolute right-4 top-4 rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-500/20 hover:text-indigo-300"
                      title="Copy result"
                    >
                      {copied ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                )}

                {activeTab === "formula" && result.formula && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                      Formula Used
                    </h3>
                    <div className="rounded-xl bg-zinc-950 p-6 font-mono text-lg text-indigo-300 border border-white/5 text-center">
                      {result.formula}
                    </div>
                  </div>
                )}

                {activeTab === "steps" && result.steps && result.steps.length > 0 && (
                  <div className="flex-1">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                      Step-by-step Solution
                    </h3>
                    <div className="space-y-4">
                      {result.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 rounded-xl bg-white/5 p-5 text-sm text-zinc-300 border border-white/5"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">
                            {idx + 1}
                          </span>
                          <span className="pt-1 leading-relaxed text-base">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center text-zinc-500 min-h-[300px]">
              <div className="mb-5 rounded-full bg-white/5 p-5">
                <ArrowLeft className="h-8 w-8 rotate-90 lg:rotate-180 text-zinc-600" />
              </div>
              <p className="text-lg">
                Enter values and click solve
                <br />
                <span className="text-sm mt-2 inline-block">to see the detailed step-by-step result here.</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((relatedTool) => (
              <ToolCard
                key={relatedTool.id}
                tool={relatedTool}
                onClick={() => onSelectTool(relatedTool.id)}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
