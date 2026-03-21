import { ArrowLeft, Copy, Check, Star } from "lucide-react";
import { useState } from "react";
import { MathTool, ToolResult } from "../lib/mathTools";
import { useAppStore } from "../lib/store";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

type ToolViewProps = {
  key?: string;
  tool: MathTool;
  onBack: () => void;
};

export function ToolView({ tool, onBack }: ToolViewProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ToolResult | null>(null);
  const [copied, setCopied] = useState(false);
  const { favorites, toggleFavorite, addHistory } = useAppStore();

  const isFavorite = favorites.includes(tool.id);

  const handleCalculate = () => {
    const res = tool.calculate(inputs);
    setResult(res);
    addHistory({
      toolId: tool.id,
      toolName: tool.name,
      inputs,
      result: String(res.result),
    });
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
      className="mx-auto max-w-3xl p-6"
    >
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
        <p className="mt-2 text-lg text-zinc-400">{tool.description}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-6 text-xl font-semibold text-white">Inputs</h2>
          <div className="space-y-4">
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
          <button
            onClick={handleCalculate}
            className="mt-8 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.98]"
          >
            Calculate
          </button>
        </div>

        {/* Output Section */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-6 text-xl font-semibold text-white">Result</h2>
          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
              <div className="relative rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-6">
                <div className="text-2xl font-bold text-white break-words">
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

              {result.formula && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Formula Used
                  </h3>
                  <div className="rounded-lg bg-zinc-950 p-4 font-mono text-sm text-indigo-300">
                    {result.formula}
                  </div>
                </div>
              )}

              {result.steps && result.steps.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Step-by-step Solution
                  </h3>
                  <div className="space-y-2">
                    {result.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-lg bg-white/5 p-3 text-sm text-zinc-300"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="flex h-48 flex-col items-center justify-center text-center text-zinc-500">
              <div className="mb-4 rounded-full bg-white/5 p-4">
                <ArrowLeft className="h-6 w-6 rotate-90 md:rotate-180" />
              </div>
              <p>
                Enter values and click calculate
                <br />
                to see the result here.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
