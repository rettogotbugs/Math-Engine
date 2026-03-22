import { useState, useMemo, useRef } from "react";
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
import { LineChart as LineChartIcon, Settings2, RefreshCw, Plus, Trash2, ZoomIn, ZoomOut, Download } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { toPng } from "html-to-image";

const COLORS = ["#818cf8", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];

export function GraphViewer() {
  const [expressions, setExpressions] = useState(["sin(x)"]);
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [points, setPoints] = useState(100);
  const [errors, setErrors] = useState<(string | null)[]>([null]);
  const graphRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (graphRef.current) {
      try {
        const dataUrl = await toPng(graphRef.current, { cacheBust: true, backgroundColor: '#18181b' });
        const link = document.createElement('a');
        link.download = 'graph.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download image', err);
      }
    }
  };

  const handleReset = () => {
    setExpressions(["sin(x)"]);
    setXMin(-10);
    setXMax(10);
    setPoints(100);
    setErrors([null]);
  };

  const handleZoomIn = () => {
    const range = xMax - xMin;
    setXMin(xMin + range * 0.25);
    setXMax(xMax - range * 0.25);
  };

  const handleZoomOut = () => {
    const range = xMax - xMin;
    setXMin(xMin - range * 0.5);
    setXMax(xMax + range * 0.5);
  };

  const handleAddExpression = () => {
    if (expressions.length < 5) {
      setExpressions([...expressions, ""]);
      setErrors([...errors, null]);
    }
  };

  const handleRemoveExpression = (index: number) => {
    const newExprs = [...expressions];
    newExprs.splice(index, 1);
    setExpressions(newExprs);

    const newErrs = [...errors];
    newErrs.splice(index, 1);
    setErrors(newErrs);
  };

  const handleExpressionChange = (index: number, value: string) => {
    const newExprs = [...expressions];
    newExprs[index] = value;
    setExpressions(newExprs);
  };

  const data = useMemo(() => {
    const step = (xMax - xMin) / points;
    const result = [];
    const newErrors = [...errors];
    
    const compiledExprs = expressions.map((expr, i) => {
      try {
        if (!expr.trim()) return null;
        const node = math.parse(expr);
        newErrors[i] = null;
        return node.compile();
      } catch (e) {
        newErrors[i] = "Invalid expression";
        return null;
      }
    });

    for (let x = xMin; x <= xMax; x += step) {
      const point: any = { x: Number(x.toFixed(2)) };
      let hasValidY = false;
      
      compiledExprs.forEach((code, i) => {
        if (code) {
          try {
            const y = code.evaluate({ x });
            if (typeof y === "number" && isFinite(y)) {
              point[`y${i}`] = Number(y.toFixed(4));
              hasValidY = true;
            }
          } catch (e) {
            // Skip invalid points
          }
        }
      });
      
      if (hasValidY) {
        result.push(point);
      }
    }
    
    // Only update errors if they changed to avoid infinite loops
    if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
      setErrors(newErrors);
    }
    
    return result;
  }, [expressions, xMin, xMax, points]);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl flex items-center justify-center gap-3">
          <LineChartIcon className="h-8 w-8 text-indigo-400" />
          Graph Viewer
        </h1>
        <p className="mt-2 text-zinc-400">
          Plot multiple mathematical functions interactively
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
              <label className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-300">
                <span>Functions f(x)</span>
                {expressions.length < 5 && (
                  <button onClick={handleAddExpression} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs">
                    <Plus className="h-3 w-3" /> Add
                  </button>
                )}
              </label>
              <div className="space-y-3">
                {expressions.map((expr, index) => (
                  <div key={index}>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <input
                        type="text"
                        value={expr}
                        onChange={(e) => handleExpressionChange(index, e.target.value)}
                        placeholder="e.g., x^2"
                        className={cn(
                          "w-full rounded-xl border bg-zinc-950 pl-8 pr-10 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:ring-1 font-mono",
                          errors[index]
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                            : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500",
                        )}
                      />
                      {expressions.length > 1 && (
                        <button 
                          onClick={() => handleRemoveExpression(index)}
                          className="absolute right-2 p-1 text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {errors[index] && <p className="mt-1 text-xs text-red-400">{errors[index]}</p>}
                  </div>
                ))}
              </div>
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
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={handleZoomIn} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2 text-sm text-white hover:bg-white/10 transition-colors">
                <ZoomIn className="h-4 w-4" /> Zoom In
              </button>
              <button onClick={handleZoomOut} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2 text-sm text-white hover:bg-white/10 transition-colors">
                <ZoomOut className="h-4 w-4" /> Zoom Out
              </button>
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
        <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl h-[500px] flex flex-col relative">
          <button
            onClick={handleDownload}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-indigo-500/20 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-500/30 hover:text-indigo-200"
          >
            <Download className="h-4 w-4" />
            Export Image
          </button>
          <div ref={graphRef} className="flex-1 w-full h-full pt-8">
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
                  itemStyle={{ fontWeight: "bold" }}
                  labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
                  formatter={(value: number, name: string) => {
                    const index = parseInt(name.replace('y', ''));
                    return [value.toFixed(4), expressions[index] || `f${index + 1}(x)`];
                  }}
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
                {expressions.map((expr, index) => (
                  <Line
                    key={`line-${index}`}
                    type="monotone"
                    dataKey={`y${index}`}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: COLORS[index % COLORS.length],
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                  />
                ))}
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
    </div>
  );
}
