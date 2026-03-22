import { MathTool } from "../mathTools";
import * as math from "mathjs";

export const statisticsTools: MathTool[] = [
  {
    id: "mean_median_mode",
    name: "Mean, Median, Mode",
    category: "Statistics & Data",
    description: "Calculate the mean, median, and mode of a dataset.",
    inputs: [
      {
        id: "data",
        label: "Data Set (comma separated)",
        type: "text",
        placeholder: "e.g., 1, 2, 2, 3, 4, 5",
      },
    ],
    calculate: (values) => {
      try {
        const dataStr = values.data.replace(/[^0-9.,-]/g, "");
        const data = dataStr.split(",").map((n) => parseFloat(n)).filter((n) => !isNaN(n));
        
        if (data.length === 0) return { result: "Please enter valid numbers." };

        const mean = math.mean(data);
        const median = math.median(data);
        const mode = math.mode(data);

        const steps = [
          `Data set: [${data.join(", ")}]`,
          `Count (n) = ${data.length}`,
          `Sum = ${math.sum(data)}`,
          `Mean = Sum / n = ${mean}`,
          `Median (middle value) = ${median}`,
          `Mode (most frequent) = ${mode.join(", ")}`,
        ];

        return {
          result: `Mean: ${mean}, Median: ${median}, Mode: ${mode.join(", ")}`,
          steps,
          formula: "Mean = Σx / n",
        };
      } catch (e) {
        return { result: "Invalid input. Please enter a comma-separated list of numbers." };
      }
    },
  },
  {
    id: "standard_deviation",
    name: "Standard Deviation",
    category: "Statistics & Data",
    description: "Calculate the population and sample standard deviation.",
    inputs: [
      {
        id: "data",
        label: "Data Set (comma separated)",
        type: "text",
        placeholder: "e.g., 1, 2, 3, 4, 5",
      },
    ],
    calculate: (values) => {
      try {
        const dataStr = values.data.replace(/[^0-9.,-]/g, "");
        const data = dataStr.split(",").map((n) => parseFloat(n)).filter((n) => !isNaN(n));
        
        if (data.length < 2) return { result: "Please enter at least two valid numbers." };

        const mean = math.mean(data);
        const variancePop = math.variance(data, 'uncorrected');
        const varianceSamp = math.variance(data, 'unbiased');
        const stdPop = math.std(data, 'uncorrected');
        const stdSamp = math.std(data, 'unbiased');

        const steps = [
          `Data set: [${data.join(", ")}]`,
          `Mean (μ) = ${mean}`,
          `Calculate squared differences from mean: Σ(x - μ)²`,
          `Population Variance (σ²) = ${variancePop}`,
          `Population Std Dev (σ) = √σ² = ${stdPop}`,
          `Sample Variance (s²) = ${varianceSamp}`,
          `Sample Std Dev (s) = √s² = ${stdSamp}`,
        ];

        return {
          result: `Pop. Std Dev: ${stdPop.toFixed(4)}, Sample Std Dev: ${stdSamp.toFixed(4)}`,
          steps,
          formula: "σ = √(Σ(x - μ)² / N), s = √(Σ(x - x̄)² / (n - 1))",
        };
      } catch (e) {
        return { result: "Invalid input." };
      }
    },
  },
  {
    id: "frequency_table",
    name: "Frequency Table Generator",
    category: "Statistics & Data",
    description: "Generate a frequency table for a given dataset, showing counts and relative frequencies.",
    inputs: [
      {
        id: "data",
        label: "Data Set (comma separated)",
        type: "text",
        placeholder: "e.g., A, B, A, C, B, A",
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
          `Total items (n) = ${total}`,
          `Unique items = ${sortedKeys.length}`,
          `--- Frequency Table ---`
        ];

        sortedKeys.forEach(key => {
          const count = counts[key];
          const relativeFreq = (count / total * 100).toFixed(2);
          steps.push(`Item '${key}': Count = ${count}, Relative Frequency = ${relativeFreq}%`);
        });

        return {
          result: `Generated frequency table for ${total} items.`,
          steps,
          formula: "Relative Frequency = (Count / Total) * 100",
        };
      } catch (e) {
        return { result: "Invalid input." };
      }
    },
  }
];
