import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import * as math from "mathjs";
import { LineChart as LineChartIcon, Settings2, RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export function GraphViewer() {
  const [expression, setExpression] = useState("sin(x)");
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [points, setPoints] = useState(100);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setExpression("sin(x)");
    setXMin(-10);
    setXMax(10);
    setPoints(100);
    setError(null);
  };

  const data = useMemo(() => {
    try {
      const node = math.parse(expression);
      const code = node.compile();
      const step = (xMax - xMin) / points;
      const result = [];

      for (let x = xMin; x <= xMax; x += step) {
        try {
          const y = code.evaluate({ x });
          // Filter out complex numbers or infinities for graphing
          if (typeof y === "number" && isFinite(y)) {
            result.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(4)) });
          }
        } catch (e) {
          // Skip invalid points
        }
      }
      setError(null);
      return result;
    } catch (e) {
      setError("Invalid expression");
      return [];
    }
  }, [expression, xMin, xMax, points]);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl flex items-center justify-center gap-3">
          <LineChartIcon className="h-8 w-8 text-indigo-400" />
          Graph Viewer
        </h1>
        <p className="mt-2 text-zinc-400">
          Plot mathematical functions interactively
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Settings2 className="h-5 w-5 text-indigo-400" />
              Settings
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Function f(x)
              </label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g., x^2"
                className={cn(
                  "w-full rounded-xl border bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all focus:ring-1 font-mono",
                  error
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                    : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500",
                )}
              />
              {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  X Min
                </label>
                <input
                  type="number"
                  value={xMin}
                  onChange={(e) => setXMin(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  X Max
                </label>
                <input
                  type="number"
                  value={xMax}
                  onChange={(e) => setXMax(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Resolution ({points} pts)
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Graph Area */}
        <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl h-[500px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#3f3f46"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="x"
                  stroke="#a1a1aa"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  tickFormatter={(val) => val.toFixed(1)}
                />
                <YAxis
                  stroke="#a1a1aa"
                  domain={["auto", "auto"]}
                  tickFormatter={(val) => val.toFixed(1)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#3f3f46",
                    borderRadius: "0.75rem",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#818cf8", fontWeight: "bold" }}
                  labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
                  formatter={(value: number) => [value.toFixed(4), "f(x)"]}
                  labelFormatter={(label: number) => `x = ${label}`}
                />
                <ReferenceLine
                  x={0}
                  stroke="#71717a"
                  strokeWidth={2}
                  opacity={0.5}
                />
                <ReferenceLine
                  y={0}
                  stroke="#71717a"
                  strokeWidth={2}
                  opacity={0.5}
                />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#818cf8"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#818cf8",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-500">
              <p>Enter a valid function to see the graph.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
