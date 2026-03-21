import { algebraSolver } from "./algebraSolver";
import { arithmeticSolver } from "./arithmeticSolver";
import { calculusSolver } from "./calculusSolver";
import { trigSolver } from "./trigSolver";
import {
  solveCombinatorics,
  solveMatrixOperations,
  solveVectorOperations,
} from "./advancedSolver";

export const universalParser = {
  parseAndSolve: (input: string) => {
    const trimmed = input.trim().toLowerCase();

    // Check for differentiation
    if (trimmed.startsWith("differentiate") || trimmed.startsWith("d/dx")) {
      const expr = trimmed.replace(/^(differentiate|d\/dx)\s*/i, "");
      return calculusSolver.differentiate(expr, "x");
    }

    // Check for integration
    if (trimmed.startsWith("integrate")) {
      const expr = trimmed.replace(/^integrate\s*/i, "");
      // Try to parse bounds if provided like "integrate x^2 from 0 to 1"
      const match = expr.match(/(.*?)\s+from\s+([-\d.]+)\s+to\s+([-\d.]+)/i);
      if (match) {
        return calculusSolver.integrateNumerical(
          match[1],
          "x",
          parseFloat(match[2]),
          parseFloat(match[3]),
        );
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

    // Check for linear equations
    if (trimmed.includes("=")) {
      return algebraSolver.solveLinear(trimmed);
    }

    // Check for LCM/GCD
    const lcmMatch = trimmed.match(/^lcm\s*\(?([\d\s,]+)\)?/i);
    if (lcmMatch) {
      const nums = lcmMatch[1].split(",").map((n) => parseInt(n.trim()));
      if (nums.length >= 2) {
        let res = nums[0];
        let steps = [`Start with ${res}`];
        for (let i = 1; i < nums.length; i++) {
          const r = arithmeticSolver.lcm(res, nums[i]);
          res = r.result;
          steps.push(...r.steps);
        }
        return { result: res, steps };
      }
    }

    const gcdMatch = trimmed.match(/^(gcd|hcf)\s*\(?([\d\s,]+)\)?/i);
    if (gcdMatch) {
      const nums = gcdMatch[2].split(",").map((n) => parseInt(n.trim()));
      if (nums.length >= 2) {
        let res = nums[0];
        let steps = [`Start with ${res}`];
        for (let i = 1; i < nums.length; i++) {
          const r = arithmeticSolver.gcd(res, nums[i]);
          res = r.result;
          steps.push(...r.steps);
        }
        return { result: res, steps };
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
        result: fact,
        steps: [
          `Calculate ${n}!`,
          `n! = n * (n-1) * ... * 1`,
          `Result: ${fact}`,
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
