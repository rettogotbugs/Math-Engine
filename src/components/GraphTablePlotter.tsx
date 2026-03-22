import React, { useMemo, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import * as math from "mathjs";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";

interface GraphTablePlotterProps {
  expression: string;
  xStart: number;
  xEnd: number;
  step: number;
}

export function GraphTablePlotter({ expression, xStart, xEnd, step }: GraphTablePlotterProps) {
  const graphRef = useRef<HTMLDivElement>(null);

  const { data, error } = useMemo(() => {
    try {
      const node = math.parse(expression);
      const code = node.compile();
      const result = [];
      
      for (let x = xStart; x <= xEnd; x += step) {
        const y = code.evaluate({ x });
        if (typeof y === "number" && isFinite(y)) {
          result.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(4)) });
        }
      }
      return { data: result, error: null };
    } catch (e) {
      return { data: [], error: "Invalid expression" };
    }
  }, [expression, xStart, xEnd, step]);

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

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="space-y-6 w-full">
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50">
        <table className="w-full text-sm text-left text-zinc-300">
          <thead className="text-xs text-zinc-400 uppercase bg-zinc-800/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-3">x</th>
              <th className="px-6 py-3">y = {expression}</th>
              <th className="px-6 py-3">(x, y)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 font-mono">{point.x}</td>
                <td className="px-6 py-4 font-mono">{point.y}</td>
                <td className="px-6 py-4 font-mono">({point.x}, {point.y})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 relative h-[400px] flex flex-col">
        <button
          onClick={handleDownload}
          className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-indigo-500/20 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-500/30 hover:text-indigo-200"
        >
          <Download className="h-4 w-4" />
          Export Graph
        </button>
        <div ref={graphRef} className="flex-1 w-full h-full pt-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" opacity={0.5} />
              <XAxis dataKey="x" stroke="#a1a1aa" type="number" domain={['dataMin', 'dataMax']} />
              <YAxis stroke="#a1a1aa" domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "0.75rem", color: "#fff" }}
                itemStyle={{ fontWeight: "bold" }}
                labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
                formatter={(value: number) => [value, 'y']}
                labelFormatter={(label: number) => `x = ${label}`}
              />
              <ReferenceLine x={0} stroke="#71717a" strokeWidth={2} opacity={0.5} />
              <ReferenceLine y={0} stroke="#71717a" strokeWidth={2} opacity={0.5} />
              <Line type="monotone" dataKey="y" stroke="#818cf8" strokeWidth={2} dot={{ r: 4, fill: "#818cf8" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
