import { MathTool } from "../mathTools";
import { algebraSolver } from "../solvers/algebraSolver";
import React from 'react';
import { GraphTablePlotter } from "../../components/GraphTablePlotter";

export const algebraTools: MathTool[] = [
  {
    id: "graph_plotter",
    name: "Graph Plotter (Table Method)",
    category: "Charts & Graphs",
    classLevel: "Class 8",
    description: "Plot a graph using the x,y table method. Generates a table of values and plots the corresponding graph.",
    inputs: [
      { id: "expr", label: "Function y = f(x)", type: "text", placeholder: "2x + 3", defaultValue: "2x + 3" },
      { id: "xStart", label: "Start x", type: "number", placeholder: "-5", defaultValue: "-5" },
      { id: "xEnd", label: "End x", type: "number", placeholder: "5", defaultValue: "5" },
      { id: "step", label: "Step", type: "number", placeholder: "1", defaultValue: "1" }
    ],
    calculate: (values) => {
      const xStart = parseFloat(values.xStart) || -5;
      const xEnd = parseFloat(values.xEnd) || 5;
      const step = parseFloat(values.step) || 1;
      
      if (xStart >= xEnd || step <= 0) {
        return { result: "Invalid range or step" };
      }
      
      return {
        result: React.createElement(GraphTablePlotter, {
          expression: values.expr,
          xStart,
          xEnd,
          step
        }),
        steps: [
          `Define the function y = ${values.expr}`,
          `Calculate y for each x from ${xStart} to ${xEnd} with step ${step}`,
          `Plot the (x, y) coordinates on the graph`
        ]
      };
    }
  },
  {
    id: "linear_eq",
    name: "Linear Equation Solver",
    category: "Algebra",
    classLevel: "Class 8",
    description: "Solve linear equations step-by-step. Essential for finding unknown values.",
    inputs: [
      {
        id: "eq",
        label: "Equation",
        type: "text",
        placeholder: "2x + 5 = 15",
        defaultValue: "2x + 5 = 15"
      },
    ],
    calculate: (values) => algebraSolver.solveEquation(values.eq),
  },
  {
    id: "quadratic_eq",
    name: "Quadratic Equation Solver",
    category: "Algebra",
    classLevel: "Class 9-10",
    description: "Find roots of quadratic equations using the discriminant method with detailed steps.",
    inputs: [
      { id: "a", label: "a", type: "number", placeholder: "1", defaultValue: "1" },
      { id: "b", label: "b", type: "number", placeholder: "-5", defaultValue: "-5" },
      { id: "c", label: "c", type: "number", placeholder: "6", defaultValue: "6" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const c = parseFloat(values.c);
      if (isNaN(a) || isNaN(b) || isNaN(c)) return { result: "Invalid input" };
      return algebraSolver.solveQuadratic(a, b, c);
    },
  },
  {
    id: "expand_expr",
    name: "Expression Expansion",
    category: "Algebra",
    classLevel: "Class 8",
    description: "Expand complex algebraic expressions into their standard polynomial form.",
    inputs: [
      { id: "expr", label: "Expression", type: "text", placeholder: "(x+3)(x-4)", defaultValue: "(x+3)(x-4)" },
    ],
    calculate: (values) => algebraSolver.expandExpression(values.expr),
  },
  {
    id: "system_2x2",
    name: "System of Linear Equations (2 Variables)",
    category: "Algebra",
    classLevel: "Class 9-10",
    description: "Solve a system of two linear equations simultaneously using substitution or elimination.",
    inputs: [
      { id: "eq1", label: "Equation 1", type: "text", placeholder: "2x + y = 10", defaultValue: "2x + y = 10" },
      { id: "eq2", label: "Equation 2", type: "text", placeholder: "x - y = 2", defaultValue: "x - y = 2" },
    ],
    calculate: (values) => {
      if (!values.eq1 || !values.eq2) return { result: "Input required" };
      return algebraSolver.solveSystem2x2(values.eq1, values.eq2);
    },
  },
  {
    id: "polynomial_eval",
    name: "Polynomial Evaluator",
    category: "Algebra",
    classLevel: "Class 9-10",
    description: "Evaluate a polynomial function for a specific value of x.",
    inputs: [
      { id: "poly", label: "Polynomial P(x)", type: "text", placeholder: "x^3 - 4x^2 + 5x - 2", defaultValue: "x^3 - 4x^2 + 5x - 2" },
      { id: "xVal", label: "Value of x", type: "number", placeholder: "2", defaultValue: "2" },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const x = parseFloat(values.xVal);
        const expr = math.parse(values.poly);
        const result = expr.evaluate({ x });
        return {
          result: `$$${result}$$`,
          steps: [
            `Evaluate $P(x) = ${expr.toTex()}$ at $x = ${x}$`,
            `Substitute $x = ${x}$: $P(${x}) = ${values.poly.replace(/x/g, `(${x})`)}$`,
            `Result: $$${result}$$`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not evaluate polynomial."] };
      }
    },
  },
  {
    id: "algebraic_identities",
    name: "Algebraic Identities",
    category: "Algebra",
    description: "Calculate standard algebraic identities like (a+b)² or a²-b². A great reference tool for factoring and expanding expressions.",
    inputs: [
      { id: "a", label: "a", type: "number", placeholder: "5", defaultValue: "5" },
      { id: "b", label: "b", type: "number", placeholder: "2", defaultValue: "2" },
      {
        id: "identity",
        label: "Identity",
        type: "select",
        options: [
          { label: "(a+b)²", value: "aplusb2" },
          { label: "(a-b)²", value: "aminusb2" },
          { label: "a²-b²", value: "a2minusb2" },
          { label: "(a+b)³", value: "aplusb3" },
          { label: "(a-b)³", value: "aminusb3" },
        ],
        defaultValue: "aplusb2"
      },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid input" };
      
      let res = 0;
      let steps = [];
      switch (values.identity) {
        case "aplusb2":
          res = Math.pow(a + b, 2);
          steps = [
            `Identity: $(a+b)^2 = a^2 + 2ab + b^2$`,
            `$(${a}+${b})^2 = ${a}^2 + 2(${a})(${b}) + ${b}^2$`,
            `$= ${a*a} + ${2*a*b} + ${b*b}$`,
            `$= ${res}$`
          ];
          break;
        case "aminusb2":
          res = Math.pow(a - b, 2);
          steps = [
            `Identity: $(a-b)^2 = a^2 - 2ab + b^2$`,
            `$(${a}-${b})^2 = ${a}^2 - 2(${a})(${b}) + ${b}^2$`,
            `$= ${a*a} - ${2*a*b} + ${b*b}$`,
            `$= ${res}$`
          ];
          break;
        case "a2minusb2":
          res = Math.pow(a, 2) - Math.pow(b, 2);
          steps = [
            `Identity: $a^2 - b^2 = (a+b)(a-b)$`,
            `$${a}^2 - ${b}^2 = (${a}+${b})(${a}-${b})$`,
            `$= (${a+b})(${a-b})$`,
            `$= ${res}$`
          ];
          break;
        case "aplusb3":
          res = Math.pow(a + b, 3);
          steps = [
            `Identity: $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$`,
            `$(${a}+${b})^3 = ${a}^3 + 3(${a})^2(${b}) + 3(${a})(${b})^2 + ${b}^3$`,
            `$= ${Math.pow(a,3)} + ${3*Math.pow(a,2)*b} + ${3*a*Math.pow(b,2)} + ${Math.pow(b,3)}$`,
            `$= ${res}$`
          ];
          break;
        case "aminusb3":
          res = Math.pow(a - b, 3);
          steps = [
            `Identity: $(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$`,
            `$(${a}-${b})^3 = ${a}^3 - 3(${a})^2(${b}) + 3(${a})(${b})^2 - ${b}^3$`,
            `$= ${Math.pow(a,3)} - ${3*Math.pow(a,2)*b} + ${3*a*Math.pow(b,2)} - ${Math.pow(b,3)}$`,
            `$= ${res}$`
          ];
          break;
      }
      return { result: `$$${res}$$`, steps };
    },
  },
  {
    id: "binomial_theorem",
    name: "Binomial Theorem Expansion",
    category: "Algebra",
    description: "Expand expressions of the form (x + y)^n using binomial coefficients. Essential for advanced algebra, probability, and calculus.",
    inputs: [
      { id: "n", label: "Power (n)", type: "number", placeholder: "4", defaultValue: "4" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      if (isNaN(n) || n < 0 || n > 10) return { result: "Invalid input (0 <= n <= 10)" };
      
      const factorial = (num: number): number => {
        if (num === 0 || num === 1) return 1;
        let result = 1;
        for (let i = 2; i <= num; i++) result *= i;
        return result;
      };
      
      const nCr = (n: number, r: number): number => {
        return factorial(n) / (factorial(r) * factorial(n - r));
      };
      
      let expansion = "";
      const steps = [
        `Expand $(x + y)^{${n}}$ using the Binomial Theorem`,
        `Formula: $(x + y)^n = \\sum_{r=0}^{n} \\binom{n}{r} x^{n-r} y^r$`
      ];
      
      for (let r = 0; r <= n; r++) {
        const coeff = nCr(n, r);
        const xPower = n - r;
        const yPower = r;
        
        let term = "";
        if (coeff !== 1) term += coeff;
        
        if (xPower > 0) {
          term += "x";
          if (xPower > 1) term += `^{${xPower}}`;
        }
        
        if (yPower > 0) {
          term += "y";
          if (yPower > 1) term += `^{${yPower}}`;
        }
        
        if (term === "") term = "1";
        
        expansion += (r === 0 ? "" : " + ") + term;
        steps.push(`Term ${r + 1} ($r=${r}$): $\\binom{${n}}{${r}} x^{${xPower}} y^{${yPower}} = ${term}$`);
      }
      
      steps.push(`Final Expansion: $$${expansion}$$`);
      
      return {
        result: `$$${expansion}$$`,
        steps
      };
    },
  },
  {
    id: "polynomial_add_sub",
    name: "Polynomial Addition/Subtraction",
    category: "Algebra",
    description: "Add or subtract two polynomials by combining like terms. A fundamental operation for simplifying complex algebraic expressions.",
    inputs: [
      { id: "p1", label: "Polynomial 1", type: "text", placeholder: "2x^2 + 3x + 1", defaultValue: "2x^2 + 3x + 1" },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "+", value: "+" },
          { label: "-", value: "-" },
        ],
        defaultValue: "+"
      },
      { id: "p2", label: "Polynomial 2", type: "text", placeholder: "x^2 - 2x + 5", defaultValue: "x^2 - 2x + 5" },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const exprStr = `(${values.p1}) ${values.op} (${values.p2})`;
        const simplified = math.simplify(exprStr).toString();
        return {
          result: `$$${math.parse(simplified).toTex()}$$`,
          steps: [
            `Expression: $${math.parse(exprStr).toTex()}$`,
            `Simplify by combining like terms.`,
            `Result: $$${math.parse(simplified).toTex()}$$`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not parse polynomials."] };
      }
    },
  },
  {
    id: "polynomial_mult",
    name: "Polynomial Multiplication",
    category: "Algebra",
    description: "Multiply two polynomials using the distributive property. Useful for finding areas in geometry and expanding algebraic models.",
    inputs: [
      { id: "p1", label: "Polynomial 1", type: "text", placeholder: "x + 2", defaultValue: "x + 2" },
      { id: "p2", label: "Polynomial 2", type: "text", placeholder: "x - 3", defaultValue: "x - 3" },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const exprStr = `(${values.p1}) * (${values.p2})`;
        // math.simplify doesn't always expand, so we can use rationalization or expand
        const expanded = math.rationalize(exprStr).toString();
        return {
          result: `$$${math.parse(expanded).toTex()}$$`,
          steps: [
            `Expression: $${math.parse(exprStr).toTex()}$`,
            `Expand by multiplying each term.`,
            `Result: $$${math.parse(expanded).toTex()}$$`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not parse polynomials."] };
      }
    },
  },
  {
    id: "arithmetic_progression",
    name: "Arithmetic Progression (AP)",
    category: "Algebra",
    description: "Find the nth term and sum of an arithmetic sequence. Essential for calculating linear growth, depreciation, and simple interest.",
    inputs: [
      { id: "a", label: "First term (a)", type: "number", placeholder: "2", defaultValue: "2" },
      { id: "d", label: "Common difference (d)", type: "number", placeholder: "3", defaultValue: "3" },
      { id: "n", label: "Number of terms (n)", type: "number", placeholder: "10", defaultValue: "10" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const d = parseFloat(values.d);
      const n = parseInt(values.n);
      if (isNaN(a) || isNaN(d) || isNaN(n) || n <= 0) return { result: "Invalid input" };
      
      const nthTerm = a + (n - 1) * d;
      const sum = (n / 2) * (2 * a + (n - 1) * d);
      
      return {
        result: `$$a_{${n}} = ${nthTerm}, S_{${n}} = ${sum}$$`,
        steps: [
          `$n$th term formula: $$a_n = a + (n-1)d$$`,
          `$$a_{${n}} = ${a} + (${n}-1)(${d}) = ${nthTerm}$$`,
          `Sum formula: $$S_n = \\frac{n}{2}[2a + (n-1)d]$$`,
          `$$S_{${n}} = \\frac{${n}}{2}[2(${a}) + (${n}-1)(${d})] = ${sum}$$`
        ]
      };
    },
  },
  {
    id: "geometric_progression",
    name: "Geometric Progression (GP)",
    category: "Algebra",
    description: "Find the nth term and sum of a geometric sequence. Crucial for modeling exponential growth, compound interest, and population dynamics.",
    inputs: [
      { id: "a", label: "First term (a)", type: "number", placeholder: "2", defaultValue: "2" },
      { id: "r", label: "Common ratio (r)", type: "number", placeholder: "3", defaultValue: "3" },
      { id: "n", label: "Number of terms (n)", type: "number", placeholder: "5", defaultValue: "5" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const r = parseFloat(values.r);
      const n = parseInt(values.n);
      if (isNaN(a) || isNaN(r) || isNaN(n) || n <= 0) return { result: "Invalid input" };
      
      const nthTerm = a * Math.pow(r, n - 1);
      let sum = 0;
      let sumStep = "";
      if (r === 1) {
        sum = n * a;
        sumStep = `$$S_{${n}} = n \\times a = ${n} \\times ${a} = ${sum}$$`;
      } else {
        sum = a * (Math.pow(r, n) - 1) / (r - 1);
        sumStep = `$$S_{${n}} = \\frac{a(r^n - 1)}{r - 1} = \\frac{${a}(${r}^{${n}} - 1)}{${r} - 1} = ${sum}$$`;
      }
      
      return {
        result: `$$a_{${n}} = ${nthTerm}, S_{${n}} = ${sum}$$`,
        steps: [
          `$n$th term formula: $$a_n = a \\cdot r^{n-1}$$`,
          `$$a_{${n}} = ${a} \\cdot ${r}^{${n}-1} = ${nthTerm}$$`,
          `Sum formula: $$S_n = \\frac{a(r^n - 1)}{r - 1} \\text{ (for } r \\neq 1 \\text{)}$$`,
          sumStep
        ]
      };
    },
  },
  {
    id: "inequality_solver",
    name: "Inequality Solver",
    category: "Algebra",
    description: "Solve linear inequalities step-by-step. Understand how to isolate variables and when to flip the inequality sign.",
    inputs: [
      {
        id: "ineq",
        label: "Inequality",
        type: "text",
        placeholder: "2x + 3 > 7",
        defaultValue: "2x + 3 > 7"
      },
    ],
    calculate: (values) => algebraSolver.solveInequality(values.ineq),
  }
];
