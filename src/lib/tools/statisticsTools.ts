import { MathTool } from "../mathTools";
import * as math from "mathjs";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartWrapper } from "../../components/ChartWrapper";

export const statisticsTools: MathTool[] = [
  {
    id: "descriptive_statistics",
    name: "Descriptive Statistics",
    category: "Statistics & Data",
    classLevel: "Class 9-10",
    description: "Calculate mean, median, mode, range, variance, and standard deviation of a dataset, and visualize its frequency distribution.",
    inputs: [
      {
        id: "data",
        label: "Data Set (comma separated)",
        type: "text",
        placeholder: "12, 15, 12, 18, 20, 15, 12",
        defaultValue: "12, 15, 12, 18, 20, 15, 12"
      },
    ],
    calculate: (values) => {
      try {
        const dataStr = values.data.replace(/[^0-9.,-]/g, "");
        const data = dataStr.split(",").map((n) => parseFloat(n)).filter((n) => !isNaN(n));
        
        if (data.length === 0) return { result: "Please enter valid numbers." };

        const mean = Number(math.mean(data)).toFixed(4);
        const median = Number(math.median(data)).toFixed(4);
        const mode = math.mode(data);
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = (max - min).toFixed(4);
        
        let variancePop = "0";
        let varianceSamp = "0";
        let stdPop = "0";
        let stdSamp = "0";
        
        if (data.length > 1) {
          variancePop = Number(math.variance(data, 'uncorrected')).toFixed(4);
          varianceSamp = Number(math.variance(data, 'unbiased')).toFixed(4);
          stdPop = Number(math.std(data, 'uncorrected')).toFixed(4);
          stdSamp = Number(math.std(data, 'unbiased')).toFixed(4);
        }

        const counts: Record<number, number> = {};
        data.forEach(num => {
          counts[num] = (counts[num] || 0) + 1;
        });
        
        const chartData = Object.entries(counts).map(([val, count]) => ({
          name: val,
          value: count
        })).sort((a, b) => parseFloat(a.name) - parseFloat(b.name));

        const chart = React.createElement(
          ChartWrapper,
          null,
          React.createElement(
            "div",
            { className: "flex justify-center w-full h-64" },
            React.createElement(
              ResponsiveContainer,
              { width: "100%", height: "100%" },
              React.createElement(
                BarChart,
                { data: chartData, margin: { top: 20, right: 20, bottom: 20, left: 20 } },
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#3f3f46", opacity: 0.5 }),
                React.createElement(XAxis, { dataKey: "name", stroke: "#a1a1aa" }),
                React.createElement(YAxis, { stroke: "#a1a1aa", allowDecimals: false }),
                React.createElement(Tooltip, {
                  contentStyle: { backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "0.75rem", color: "#fff" },
                  formatter: (value: number) => [value, 'Frequency']
                }),
                React.createElement(Bar, { dataKey: "value", fill: "#818cf8", radius: [4, 4, 0, 0] })
              )
            )
          )
        );

        const steps = [
          `Data set: $$[${data.join(", ")}]$$`,
          `Count ($n$) = $${data.length}$`,
          `Sum = $${math.sum(data)}$`,
          `$$\\text{Mean} = \\frac{\\text{Sum}}{n} = ${mean}$$`,
          `$$\\text{Median} = ${median}$$`,
          `$$\\text{Mode} = ${mode.join(", ")}$$`,
          `$$\\text{Range} = \\text{Max} - \\text{Min} = ${max} - ${min} = ${range}$$`,
          ...(data.length > 1 ? [
            `$$\\text{Population Variance } (\\sigma^2) = ${variancePop}$$`,
            `$$\\text{Population Std Dev } (\\sigma) = \\sqrt{\\sigma^2} = ${stdPop}$$`,
            `$$\\text{Sample Variance } (s^2) = ${varianceSamp}$$`,
            `$$\\text{Sample Std Dev } (s) = \\sqrt{s^2} = ${stdSamp}$$`,
          ] : [])
        ];

        return {
          result: React.createElement(
            "div",
            { className: "space-y-4" },
            React.createElement(
              "div",
              { className: "grid grid-cols-2 md:grid-cols-3 gap-4" },
              React.createElement("div", { className: "bg-zinc-800/50 p-3 rounded-xl" }, React.createElement("div", { className: "text-xs text-zinc-400" }, "Mean"), React.createElement("div", { className: "text-lg font-semibold" }, mean)),
              React.createElement("div", { className: "bg-zinc-800/50 p-3 rounded-xl" }, React.createElement("div", { className: "text-xs text-zinc-400" }, "Median"), React.createElement("div", { className: "text-lg font-semibold" }, median)),
              React.createElement("div", { className: "bg-zinc-800/50 p-3 rounded-xl" }, React.createElement("div", { className: "text-xs text-zinc-400" }, "Mode"), React.createElement("div", { className: "text-lg font-semibold" }, mode.join(", "))),
              React.createElement("div", { className: "bg-zinc-800/50 p-3 rounded-xl" }, React.createElement("div", { className: "text-xs text-zinc-400" }, "Range"), React.createElement("div", { className: "text-lg font-semibold" }, range)),
              React.createElement("div", { className: "bg-zinc-800/50 p-3 rounded-xl" }, React.createElement("div", { className: "text-xs text-zinc-400" }, "Pop. Std Dev"), React.createElement("div", { className: "text-lg font-semibold" }, stdPop)),
              React.createElement("div", { className: "bg-zinc-800/50 p-3 rounded-xl" }, React.createElement("div", { className: "text-xs text-zinc-400" }, "Sample Std Dev"), React.createElement("div", { className: "text-lg font-semibold" }, stdSamp))
            ),
            chart
          ),
          steps,
          formula: "$$\\text{Mean} = \\frac{\\sum x}{n}, \\sigma = \\sqrt{\\frac{\\sum (x - \\mu)^2}{N}}$$",
        };
      } catch (e) {
        return { result: "Invalid input. Please enter a comma-separated list of numbers." };
      }
    },
  },
  {
    id: "frequency_table",
    name: "Frequency Table Generator",
    category: "Statistics & Data",
    classLevel: "Class 9-10",
    description: "Generate a frequency table for a given dataset, showing counts and relative frequencies.",
    inputs: [
      {
        id: "data",
        label: "Data Set (comma separated)",
        type: "text",
        placeholder: "Red, Blue, Green, Red, Blue, Red",
        defaultValue: "Red, Blue, Green, Red, Blue, Red"
      },
    ],
    calculate: (values) => {
      try {
        const dataStr = values.data;
        const data = dataStr.split(",").map((item) => item.trim()).filter((item) => item.length > 0);
        
        if (data.length === 0) return { result: "Please enter valid data." };

        const counts: Record<string, number> = {};
        data.forEach(item => {
          counts[item] = (counts[item] || 0) + 1;
        });

        const total = data.length;
        const sortedKeys = Object.keys(counts).sort();

        const steps = [
          `Total items ($n$) = $${total}$`,
          `Unique items = $${sortedKeys.length}$`,
          `$\\text{--- Frequency Table ---}$`
        ];

        sortedKeys.forEach(key => {
          const count = counts[key];
          const relativeFreq = (count / total * 100).toFixed(2);
          steps.push(`$\\text{Item } '${key}': \\text{Count } = ${count}, \\text{Relative Frequency } = ${relativeFreq}\\%$`);
        });

        return {
          result: `Generated frequency table for ${total} items.`,
          steps,
          formula: "$$\\text{Relative Frequency} = \\frac{\\text{Count}}{\\text{Total}} \\times 100$$",
        };
      } catch (e) {
        return { result: "Invalid input." };
      }
    },
  }
];
