import { useState } from "react";
import { Calculator, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function ExpressionEvaluator() {
  const [isOpen, setIsOpen] = useState(false);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const evaluate = () => {
    try {
      // Safe evaluation using Function constructor
      // Only allow math operations and numbers
      if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error("Invalid characters");
      }
      // eslint-disable-next-line no-new-func
      const res = new Function(`return ${expression}`)();
      if (typeof res === "number" && !isNaN(res)) {
        setResult(res.toString());
        setError(null);
      } else {
        throw new Error("Invalid result");
      }
    } catch (e) {
      setError("Invalid expression");
      setResult(null);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl shadow-indigo-500/50 transition-transform hover:scale-110 active:scale-95"
      >
        <Calculator className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-white/10 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-white">Quick Calculator</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={expression}
                onChange={(e) => {
                  setExpression(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") evaluate();
                }}
                placeholder="e.g., 2 + 3 * (5 - 1)"
                className={cn(
                  "w-full rounded-xl border bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all focus:ring-1",
                  error
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                    : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500",
                )}
              />

              {result && (
                <div className="rounded-xl bg-indigo-500/10 p-4 text-center text-2xl font-bold text-indigo-400">
                  = {result}
                </div>
              )}

              {error && (
                <div className="text-center text-sm font-medium text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={evaluate}
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-500 active:scale-[0.98]"
              >
                Evaluate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
