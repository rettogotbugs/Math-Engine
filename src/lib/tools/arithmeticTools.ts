import { MathTool } from "../mathTools";
import { numberSystemSolver } from "../solvers/numberSystemSolver";
import { solveCombinatorics } from "../solvers/advancedSolver";

export const arithmeticTools: MathTool[] = [
  {
    id: "prime_checker",
    name: "Prime Number Checker",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Check if a given number is prime. Useful for cryptography, factoring, and number theory problems.",
    inputs: [
      { id: "n", label: "Number", type: "number", placeholder: "17" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      if (isNaN(n)) return { result: "Invalid input" };
      return numberSystemSolver.isPrime(n);
    },
  },
  {
    id: "factors_multiples",
    name: "Factors & Multiples",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Find all factors and the first few multiples of a number. Essential for simplifying fractions and finding common denominators.",
    inputs: [
      { id: "n", label: "Number", type: "number", placeholder: "12" },
      { id: "count", label: "Multiples Count", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      const count = parseInt(values.count) || 5;
      if (isNaN(n)) return { result: "Invalid input" };
      
      const factors = [];
      for (let i = 1; i <= Math.abs(n); i++) {
        if (n % i === 0) factors.push(i);
      }
      
      const multiples = [];
      for (let i = 1; i <= count; i++) {
        multiples.push(n * i);
      }
      
      return {
        result: `Factors: ${factors.join(", ")} | Multiples: ${multiples.join(", ")}`,
        steps: [
          `Find factors of ${n}: Numbers that divide ${n} evenly.`,
          `Factors: ${factors.join(", ")}`,
          `Find first ${count} multiples of ${n}: Multiply ${n} by 1, 2, ..., ${count}.`,
          `Multiples: ${multiples.join(", ")}`
        ]
      };
    },
  },
  {
    id: "factorial",
    name: "Factorial Calculator",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Calculate the factorial of a non-negative integer (n!). Used widely in combinatorics, probability, and calculus.",
    inputs: [
      { id: "n", label: "Number (n)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      if (isNaN(n)) return { result: "Invalid input" };
      return numberSystemSolver.factorial(n);
    },
  },
  {
    id: "divisibility_rules",
    name: "Divisibility Rules Checker",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Check if a number is divisible by common integers (2, 3, 4, 5, 6, 8, 9, 10). Helpful for quick mental math and factoring.",
    inputs: [
      { id: "n", label: "Number", type: "number", placeholder: "120" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      if (isNaN(n)) return { result: "Invalid input" };
      
      const rules = [2, 3, 4, 5, 6, 8, 9, 10];
      const divisibleBy = rules.filter(d => n % d === 0);
      
      return {
        result: `Divisible by: ${divisibleBy.join(", ")}`,
        steps: [
          `Check divisibility of ${n} by common numbers:`,
          ...rules.map(d => `${n} ÷ ${d} = ${n / d} ${n % d === 0 ? '(Yes)' : '(No)'}`)
        ]
      };
    },
  },
  {
    id: "base_converter",
    name: "Base Converter",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Convert a number from one base to another (e.g., Binary to Decimal, Hexadecimal to Octal). Essential for computer science.",
    inputs: [
      { id: "num", label: "Number", type: "text", placeholder: "1010" },
      { id: "fromBase", label: "From Base", type: "number", placeholder: "2" },
      { id: "toBase", label: "To Base", type: "number", placeholder: "10" },
    ],
    calculate: (values) => {
      const fromBase = parseInt(values.fromBase);
      const toBase = parseInt(values.toBase);
      if (isNaN(fromBase) || isNaN(toBase) || !values.num) return { result: "Invalid input" };
      return numberSystemSolver.baseConverter(values.num, fromBase, toBase);
    },
  },
  {
    id: "combinatorics",
    name: "Combinatorics (nCr / nPr)",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Calculate Permutations (nPr) and Combinations (nCr). Crucial for probability, statistics, and counting problems.",
    inputs: [
      { id: "n", label: "Total items (n)", type: "number", placeholder: "5" },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "Combination (nCr)", value: "nCr" },
          { label: "Permutation (nPr)", value: "nPr" },
        ],
      },
      {
        id: "r",
        label: "Selected items (r)",
        type: "number",
        placeholder: "2",
      },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      const r = parseInt(values.r);
      if (isNaN(n) || isNaN(r)) return { result: "Invalid input" };
      return solveCombinatorics(n, r, values.op as "nCr" | "nPr");
    },
  },
  {
    id: "perfect_square",
    name: "Perfect Square Checker",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Check if a number is a perfect square (an integer multiplied by itself). Useful in algebra and geometry.",
    inputs: [
      { id: "n", label: "Number", type: "number", placeholder: "e.g., 16" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      if (isNaN(n) || n < 0) return { result: "Invalid input (n >= 0)" };
      const root = Math.sqrt(n);
      const isPerfect = Number.isInteger(root);
      return {
        result: isPerfect ? "Yes, it is a perfect square" : "No, it is not a perfect square",
        steps: [
          `Find the square root of ${n}`,
          `√${n} = ${root}`,
          isPerfect ? `${root} is an integer, so ${n} is a perfect square.` : `${root} is not an integer, so ${n} is not a perfect square.`
        ]
      };
    },
  },
  {
    id: "logarithm_calc",
    name: "Logarithm Calculator",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Calculate the logarithm of a number to a specific base. Essential for solving exponential equations and working with scales (like pH or Richter).",
    inputs: [
      { id: "num", label: "Number (x)", type: "number", placeholder: "e.g., 100" },
      { id: "base", label: "Base (b)", type: "number", placeholder: "e.g., 10" },
    ],
    calculate: (values) => {
      const num = parseFloat(values.num);
      const base = parseFloat(values.base);
      if (isNaN(num) || isNaN(base) || num <= 0 || base <= 0 || base === 1) return { result: "Invalid input" };
      
      const result = Math.log(num) / Math.log(base);
      
      return {
        result: result.toFixed(4),
        steps: [
          `Calculate log base ${base} of ${num}`,
          `Formula: log_b(x) = ln(x) / ln(b)`,
          `log_${base}(${num}) = ln(${num}) / ln(${base})`,
          `log_${base}(${num}) = ${Math.log(num).toFixed(4)} / ${Math.log(base).toFixed(4)}`,
          `Result: ${result.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "perfect_cube",
    name: "Perfect Cube Checker",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Check if a number is a perfect cube (an integer multiplied by itself twice). Useful in algebra and volume calculations.",
    inputs: [
      { id: "n", label: "Number", type: "number", placeholder: "e.g., 27" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      if (isNaN(n)) return { result: "Invalid input" };
      const root = Math.cbrt(n);
      const isPerfect = Number.isInteger(root);
      return {
        result: isPerfect ? "Yes, it is a perfect cube" : "No, it is not a perfect cube",
        steps: [
          `Find the cube root of ${n}`,
          `∛${n} = ${root}`,
          isPerfect ? `${root} is an integer, so ${n} is a perfect cube.` : `${root} is not an integer, so ${n} is not a perfect cube.`
        ]
      };
    },
  },
  {
    id: "square_root",
    name: "Square Root Calculator",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Calculate the principal square root of a non-negative number. Fundamental operation in algebra, geometry, and statistics.",
    inputs: [
      { id: "n", label: "Number", type: "number", placeholder: "e.g., 25" },
    ],
    calculate: (values) => {
      const n = parseFloat(values.n);
      if (isNaN(n) || n < 0) return { result: "Invalid input (n >= 0)" };
      const root = Math.sqrt(n);
      return {
        result: root.toString(),
        steps: [
          `Calculate √${n}`,
          `Result: ${root}`
        ]
      };
    },
  },
  {
    id: "cube_root",
    name: "Cube Root Calculator",
    category: "Arithmetic & Number System",
    classLevel: "Class 8",
    description: "Calculate the cube root of a real number. Important for solving cubic equations and finding dimensions of cubic volumes.",
    inputs: [
      { id: "n", label: "Number", type: "number", placeholder: "e.g., 64" },
    ],
    calculate: (values) => {
      const n = parseFloat(values.n);
      if (isNaN(n)) return { result: "Invalid input" };
      const root = Math.cbrt(n);
      return {
        result: root.toString(),
        steps: [
          `Calculate ∛${n}`,
          `Result: ${root}`
        ]
      };
    },
  }
];
