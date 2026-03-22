import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { universalParser } from "../lib/solvers/universalParser";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export function UniversalInput() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSolve = () => {
    if (!input.trim()) return;
    const res = universalParser.parseAndSolve(input);
    setResult(res);
  };

  return (
    <div className="mx-auto w-full max-w-3xl mb-4">
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border bg-zinc-900/80 px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-300",
            isFocused
              ? "border-indigo-500 ring-4 ring-indigo-500/20"
              : "border-white/10",
          )}
        >
          <Sparkles
            className={cn(
              "h-5 w-5 transition-colors",
              isFocused ? "text-indigo-400" : "text-zinc-500",
            )}
          />
          <input
            type="text"
            placeholder="Enter your math problem here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSolve()}
            className="w-full bg-transparent text-lg text-white placeholder-zinc-500 outline-none font-mono"
          />
          <button
            onClick={handleSolve}
            className="rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white transition-all hover:bg-indigo-500 active:scale-95"
          >
            Solve
          </button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 top-full z-20 mt-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl backdrop-blur-xl"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-white">Result</h3>
                  <button
                    onClick={() => setResult(null)}
                    className="text-sm text-zinc-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className={cn(
                  "rounded-xl bg-indigo-500/10 p-4 mb-6 border border-indigo-500/20",
                  React.isValidElement(result.result) ? "" : "text-2xl font-bold text-indigo-400 font-mono break-all"
                )}>
                  {result.result}
                </div>

                {result.steps && result.steps.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                      Step-by-step Solution
                    </h4>
                    <motion.div 
                      className="space-y-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                    >
                      {result.steps.map((step: string, idx: number) => (
                        <motion.div
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          className="flex items-start gap-3 rounded-lg bg-white/5 p-3 text-sm text-zinc-300"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">
                            {idx + 1}
                          </span>
                          <span className="pt-0.5 font-mono">{step}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
