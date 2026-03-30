import { algebraSolver } from "./algebraSolver";
import { arithmeticSolver } from "./arithmeticSolver";
import { calculusSolver } from "./calculusSolver";
import { trigSolver } from "./trigSolver";
import {
  solveCombinatorics,
  solveMatrixOperations,
  solveVectorOperations,
} from "./advancedSolver";
import * as math from "mathjs";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const universalParser = {
  parseAndSolve: (input: string) => {
    const sanitizedInput = input.replace(/×/g, "*").replace(/÷/g, "/");
    const trimmed = sanitizedInput.trim().toLowerCase();

    // Check for Data Input Mode (list of numbers)
    const isNumberList = /^[-0-9.,\s]+$/.test(trimmed) && trimmed.includes(",");
    if (isNumberList) {
      const data = trimmed
        .split(",")
        .map((n) => parseFloat(n.trim()))
        .filter((n) => !isNaN(n));
      if (data.length >= 2) {
        const mean = math.mean(data);
        const median = math.median(data);

        let modeStr = "";
        try {
          const mode = math.mode(data);
          modeStr = mode.join(", ");
        } catch (e) {
          modeStr = "N/A";
        }

        const sum = math.sum(data);

        const chartData = data.map((val, i) => ({
          name: `Item ${i + 1}`,
          value: val,
        }));

        const resultNode = React.createElement(
          "div",
          { className: "space-y-4 w-full" },
          React.createElement(
            "div",
            { className: "grid grid-cols-2 md:grid-cols-4 gap-4" },
            React.createElement(
              "div",
              { className: "bg-white/5 p-3 rounded-xl" },
              React.createElement(
                "div",
                { className: "text-xs text-zinc-400 uppercase" },
                "Count",
              ),
              React.createElement(
                "div",
                { className: "text-xl font-bold text-white" },
                data.length,
              ),
            ),
            React.createElement(
              "div",
              { className: "bg-white/5 p-3 rounded-xl" },
              React.createElement(
                "div",
                { className: "text-xs text-zinc-400 uppercase" },
                "Sum",
              ),
              React.createElement(
                "div",
                { className: "text-xl font-bold text-white" },
                sum,
              ),
            ),
            React.createElement(
              "div",
              { className: "bg-white/5 p-3 rounded-xl" },
              React.createElement(
                "div",
                { className: "text-xs text-zinc-400 uppercase" },
                "Mean",
              ),
              React.createElement(
                "div",
                { className: "text-xl font-bold text-white" },
                mean.toFixed(2),
              ),
            ),
            React.createElement(
              "div",
              { className: "bg-white/5 p-3 rounded-xl" },
              React.createElement(
                "div",
                { className: "text-xs text-zinc-400 uppercase" },
                "Median",
              ),
              React.createElement(
                "div",
                { className: "text-xl font-bold text-white" },
                median,
              ),
            ),
          ),
          React.createElement(
            "div",
            { className: "h-48 w-full mt-4" },
            React.createElement(
              ResponsiveContainer,
              { width: "100%", height: "100%" },
              React.createElement(
                BarChart,
                { data: chartData },
                React.createElement(XAxis, { dataKey: "name", hide: true }),
                React.createElement(YAxis, { hide: true }),
                React.createElement(Tooltip, {
                  contentStyle: {
                    backgroundColor: "#18181b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  },
                }),
                React.createElement(Bar, {
                  dataKey: "value",
                  fill: "#818cf8",
                  radius: [4, 4, 0, 0],
                }),
              ),
            ),
          ),
        );

        return {
          result: resultNode,
          steps: [
            `Detected data set: [${data.join(", ")}]`,
            `Calculated statistics and generated visualization.`,
          ],
        };
      }
    }

    // Check for differentiation
    if (trimmed.startsWith("differentiate") || trimmed.startsWith("d/dx")) {
      const expr = trimmed.replace(/^(differentiate|d\/dx)\s*/i, "");
      return calculusSolver.differentiate(expr, "x");
    }

    // Check for integration
    if (trimmed.startsWith("integrate")) {
      const expr = trimmed.replace(/^integrate\s*/i, "");
      // Try to parse bounds if provided like "integrate x^2 from 0 to pi"
      const match = expr.match(/(.*?)\s+from\s+(.+?)\s+to\s+(.+)/i);
      if (match) {
        try {
          const lowerBound = math.evaluate(match[2]);
          const upperBound = math.evaluate(match[3]);
          return calculusSolver.integrateNumerical(
            match[1],
            "x",
            lowerBound,
            upperBound,
          );
        } catch (e) {
          return {
            result: "Error parsing integration bounds",
            steps: [(e as Error).message],
          };
        }
      }
      return {
        result:
          'Symbolic integration not supported yet. Please provide bounds like "integrate x^2 from 0 to 1"',
        steps: [],
      };
    }

    // Check for trig functions
    const trigMatch = trimmed.match(
      /^(sin|cos|tan)\s*\(?\s*([-\d.]+)\s*(deg|rad)?\)?/i,
    );
    if (trigMatch) {
      const func = trigMatch[1];
      const angle = parseFloat(trigMatch[2]);
      const unit = trigMatch[3] === "rad" ? "rad" : "deg";
      return trigSolver.evaluateTrig(func, angle, unit);
    }

    // Check for linear/quadratic equations
    if (trimmed.includes("=")) {
      return algebraSolver.solveEquation(trimmed);
    }

    // Check for inequalities
    if (trimmed.match(/(<=|>=|<|>)/)) {
      return algebraSolver.solveInequality(trimmed);
    }

    // Check for LCM/GCD
    const lcmMatch = trimmed.match(/^lcm\s*\(?([\d\s,]+)\)?/i);
    if (lcmMatch) {
      const nums = lcmMatch[1].split(",").map((n) => parseInt(n.trim()));
      if (nums.length >= 2) {
        let res = nums[0];
        let steps = [`Start with $${res}$`];
        for (let i = 1; i < nums.length; i++) {
          const r = arithmeticSolver.lcm(res, nums[i]);
          res = parseInt(r.result.replace(/[^0-9-]/g, ''));
          steps.push(...r.steps);
        }
        return { result: `$$${res}$$`, steps };
      }
    }

    const gcdMatch = trimmed.match(/^(gcd|hcf)\s*\(?([\d\s,]+)\)?/i);
    if (gcdMatch) {
      const nums = gcdMatch[2].split(",").map((n) => parseInt(n.trim()));
      if (nums.length >= 2) {
        let res = nums[0];
        let steps = [`Start with $${res}$`];
        for (let i = 1; i < nums.length; i++) {
          const r = arithmeticSolver.gcd(res, nums[i]);
          res = r.result;
          steps.push(...r.steps);
        }
        return { result: `$$${res}$$`, steps };
      }
    }

    // Check for factorial
    const factMatch =
      trimmed.match(/^(factorial|fact)\s*(\d+)/i) || trimmed.match(/^(\d+)!/);
    if (factMatch) {
      const n = parseInt(factMatch[2] || factMatch[1]);
      let fact = 1;
      for (let i = 2; i <= n; i++) fact *= i;
      return {
        result: `$$${fact}$$`,
        steps: [
          `Calculate $${n}!$`,
          `$n! = n \\times (n-1) \\times \\dots \\times 1$`,
          `Result: $${fact}$`,
        ],
      };
    }

    // Check for Combinatorics
    const combMatch = trimmed.match(/^(\d+)\s*(c|p)\s*(\d+)$/i);
    if (combMatch) {
      const n = parseInt(combMatch[1]);
      const op = combMatch[2].toLowerCase() === "c" ? "nCr" : "nPr";
      const r = parseInt(combMatch[3]);
      return solveCombinatorics(n, r, op);
    }

    // Check for Matrix operations
    const matrixMatch = trimmed.match(/^det\s*(\[.*\])$/i);
    if (matrixMatch) {
      return solveMatrixOperations(matrixMatch[1], "", "determinant");
    }
    const matrixInvMatch = trimmed.match(/^inv\s*(\[.*\])$/i);
    if (matrixInvMatch) {
      return solveMatrixOperations(matrixInvMatch[1], "", "inverse");
    }

    // Check for Vector operations
    const vectorMagMatch =
      trimmed.match(/^mag\s*(\[.*\])$/i) || trimmed.match(/^\|(\[.*\])\|$/i);
    if (vectorMagMatch) {
      return solveVectorOperations(vectorMagMatch[1], "", "magnitude");
    }

    // Default to simplifying expression
    return algebraSolver.simplifyExpression(trimmed);
  },
};
